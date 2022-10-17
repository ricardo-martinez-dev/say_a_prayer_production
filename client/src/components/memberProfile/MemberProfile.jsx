import "./style.css";
import React from "react";
import FriendshipButton from "../friendshipButton/FriendshipButton";
import MemberBasicInfo from "../memberBasicInfo/MemberBasicInfo";
import MemberStatistics from "../memberStatistics/MemberStatistics";
import ProfileActivities from "../profileActivities/ProfileActivities";
import IconClose from "../iconClose/IconClose";
import Friends from "../Friends/Friends";
import FriendsExpanded from "../FriendsExpanded/FriendsExpanded";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class MemberProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      communityMember: null,
      showFriends: true,
      showActivities: true,
      expandeFriends: false,
    };
  }

  async componentDidMount() {
    const user_id = this.props.properties.communityMember
      ? this.props.properties.communityMember._id
      : this.props.properties.userInfo.user_id;

    const url = `${process.env.REACT_APP_API_URL}/users/${user_id}`;
    const communityMember = await axiosFetch.axiosGet({ url });

    this.setState({ communityMember, isLoading: false });
  }

  getUserAndMemberIds = (obj) => {
    const { userId, communityMember } = obj;

    return {
      user_id: userId,
      password: obj.userInfo.password,
      communityMember:
        communityMember._id === userId ? userId : communityMember._id,
    };
  };

  getOwnership = (obj) => {
    const { userId, communityMember } = obj;
    let ownership = "";

    if (!communityMember) ownership = "Your";
    else {
      if (communityMember._id == userId) ownership = "Your";
      else ownership = "Member";
    }

    return ownership;
  };

  handleHideFriends = () => {
    this.setState({ showFriends: false });
  };

  handleShowFriends = () => {
    this.setState({ showFriends: true });
  };

  handleHideActivities = () => {
    this.setState({ showActivities: false });
  };

  handleShowActivities = () => {
    this.setState({ showActivities: true, showFriends: false });
  };

  handleExpandActivities = () => {
    this.setState({
      showFriends: false,
    });
  };

  handleExpandeFriends = () => {
    const expandeFriends = this.state.expandeFriends ? false : true;

    this.setState({
      expandeFriends,
      showActivities: this.state.expandeFriends ? true : false,
      showFriends: this.state.expandeFriends ? true : false,
    });
  };

  render() {
    if (this.state.isLoading) return null;

    const { properties } = this.props;
    const { userId, communityMember } = properties;
    const ownership = this.getOwnership(properties);
    const userAndMemberIds = this.getUserAndMemberIds(this.props.properties);

    const functions = {
      ...this.props.functions,
      onHideFriends: this.handleHideFriends,
      onShowFriends: this.handleShowFriends,
      onShowActivities: this.handleShowActivities,
      onHideActivities: this.handleHideActivities,
      onExpandeFriends: this.handleExpandeFriends,
      onExpandActivities: this.handleExpandActivities,
    };

    return (
      <div
        id="member-profile"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>{ownership} Profile</h2>

        <div className="gradient-border">
          <div id="top-box">
            <IconClose section="profile" functions={functions} />

            {ownership.toLowerCase() !== "your" ? (
              <FriendshipButton
                properties={userAndMemberIds}
                functions={functions}
                elem="member-profile"
              />
            ) : null}

            <MemberBasicInfo
              member={this.state.communityMember}
              userId={userId}
              properties={this.props.properties}
              ownership={ownership}
              functions={functions}
            />
            <MemberStatistics
              member={this.state.communityMember}
              userId={userId}
              functions={functions}
              properties={properties}
            />
          </div>
        </div>

        <div>
          {this.state.showFriends && (
            <Friends functions={functions} properties={properties} />
          )}
        </div>

        <div id="bottom-box">
          {this.state.expandeFriends && (
            <FriendsExpanded
              functions={functions}
              properties={properties}
              target="friends"
            />
          )}

          {this.state.showActivities && (
            <ProfileActivities
              userId={
                ownership.toLowerCase() !== "your"
                  ? communityMember._id
                  : userId
              }
              functions={functions}
              properties={properties}
            />
          )}
        </div>
      </div>
    );
  }
}

export default MemberProfile;
