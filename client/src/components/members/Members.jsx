import "./style.css";
import React from "react";
import Avatar from "../avatar/Avatar";
import FriendshipButton from "../friendshipButton/FriendshipButton";
import Spinner from "../spinner/Spinner";
const axios = require("axios");
require("dotenv").config();

class Members extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        user_id: null,
        email: null,
        password: null,
      },
      members: [],
      isLoading: true,
    };
  }

  handleUserInfo = async () => {
    const { user_id, email, password } = this.props.properties.userInfo;

    const userInfo = {
      user_id,
      email,
      password,
    };

    this.setState({ userInfo });
  };

  // fetch members
  fetchMembers = async () => {
    const url = `${process.env.REACT_APP_API_URL}/members/all`;
    const { user_id, email, password } = this.state.userInfo;

    const obj = {
      user_id,
      email,
      password,
    };

    const members = await axios
      .get(url, { params: obj })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    this.setState({ members });
  };

  handleRequest = (obj) => {
    const friendships = this.state.members.friendships.filter((frnd) => {
      const { user_id, communityMember } = obj;
      return frnd.from_user !== communityMember && frnd.to_user !== user_id;
    });

    const members = this.state.members;
    members.friendships = friendships;

    this.setState({ members });
  };

  // todo : DRY this functions. Same as in friendship-button.jsx
  handleReject = async (obj) => {
    const { user_id, communityMember } = obj;

    this.handleRequest(obj);
    this.setState({ friendship: null });
    this.updateFriendshipStatus({ user_id, communityMember, event: "reject" });
  };

  // todo : DRY this functions. Same as in friendship-button.jsx
  handleAccept = async (obj) => {
    const { user_id, communityMember } = obj;

    this.handleRequest(obj);
    this.setState({
      friendship: { ...obj, status: "accepted" },
    });

    this.updateFriendshipStatus({ user_id, communityMember, event: "accept" });
  };

  // todo : DRY this functions. Same as in friendship-button.jsx
  updateFriendshipStatus = async (obj) => {
    const { user_id, communityMember, event } = obj;

    // TODO : update friendship status
    const url = `${process.env.REACT_APP_API_URL}/friendship/update`;
    const res = await axios
      .get(url, { params: { user_id, communityMember, event } })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    this.setState({ friendship: res });
  };

  async componentDidMount() {
    await this.handleUserInfo();
    await this.fetchMembers();

    this.setState({ isLoading: false });
  }

  render() {
    const { members, isLoading } = this.state;
    const { user_id, password } = this.props.properties.userInfo;

    return (
      <div
        id="members"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>Members</h2>

        <div id="members">
          {isLoading && <Spinner />}

          <ul id="members-friendship-request">
            {!isLoading &&
              members.map((member, i) => (
                <li className="members-friendships" key={i}>
                  <div id="pic-info">
                    <Avatar
                      user_id={member._id}
                      functions={this.props.functions}
                      fromPage="members"
                    />

                    <div id="member-info">
                      <ul id="member-info-ul">
                        <li className="member-info-li" id="member-name">
                          {member.fname} {member.lname}
                        </li>
                        <li className="member-info-li">{member.country}</li>
                        <li className="member-info-li">{member.religion}</li>
                      </ul>
                    </div>
                  </div>

                  <FriendshipButton
                    properties={{
                      user_id,
                      password,
                      communityMember: member._id,
                    }}
                    functions={this.props.functions}
                    elem="members"
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Members;
