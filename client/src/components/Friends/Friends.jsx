import "./style.css";
import React from "react";
import Avatar from "../avatar/Avatar";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class Friends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { _id } = this.props.properties.communityMember;
    const url = `${process.env.REACT_APP_API_URL}/friends/random/${_id}`;

    const friends = await axiosFetch.axiosGet({ url });

    this.setState({ friends, isLoading: false });
  }

  render() {
    if (this.state.isLoading) return null;

    const {
      onShowMemberProfile,
      onSectionToggle,
      onHideActivities,
      onExpandeFriends,
    } = this.props.functions;

    return (
      <>
        {this.state.friends.length > 0 && (
          <div id="friends">
            <h2>
              <span></span>
              Friends
              <span
                className="more"
                onClick={() => {
                  onHideActivities();
                  onExpandeFriends();
                }}
              >
                <i className="fas fa-external-link-alt"></i>
              </span>
            </h2>
            <div id="friends-holder">
              <ul className="friend">
                {this.state.friends.map((friend) => (
                  <li
                    className="foooooo"
                    key={friend.user_id}
                    onClick={async () => {
                      await onShowMemberProfile({ user_id: friend.user_id });
                      onSectionToggle({ to: "member profile" });
                    }}
                  >
                    {friend.name.includes("avatar.jpg") ? (
                      <img
                        src={
                          friend.name.includes("avatar.jpg")
                            ? "./gallery/avatars/avatar.jpg"
                            : `${process.env.REACT_APP_API_URL}/avatar/${friend.name}`
                        }
                      />
                    ) : (
                      <Avatar
                        user_id={friend.user_id}
                        functions={this.props.functions}
                        properties={this.props.properties}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Friends;
