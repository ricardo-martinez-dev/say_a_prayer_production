import "./style.css";
import React from "react";
import Avatar from "../avatar/Avatar";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class FriendsExpanded extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { _id } = this.props.properties.communityMember;
    const { user_id } = this.props.properties.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/friends/all`;
    const obj = {
      params: {
        memberId: _id,
        user_id,
      },
    };
    const friends = await axiosFetch.axiosGet({ url, obj });

    this.setState({ friends, isLoading: false });
  }

  render() {
    if (this.state.isLoading) return null;
    const { functions, target } = this.props;

    return (
      <div id="friendships">
        <div id="friendships">
          <h3 id="last-publications">
            <span></span>
            <span>{target}</span>
            <span
              id="close-last-publications"
              onClick={() => {
                functions.onShowActivities();
                functions.onShowFriends();
                functions.onExpandeFriends();
              }}
            >
              <i className="fa-solid fa-circle-arrow-left"></i>
            </span>
          </h3>

          <div id="friends-list">
            <ul className="friend">
              {this.state.friends.length === 0 && <li className="empty"></li>}

              {this.state.friends.length !== 0 &&
                this.state.friends.map((friend) => (
                  <li
                    className="not-empty"
                    key={friend.user_id}
                    onClick={async () => {
                      await functions.onShowMemberProfile({
                        user_id: friend.user_id,
                      });
                      functions.onSectionToggle({ to: "member profile" });
                    }}
                  >
                    <div id="image">
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
                    </div>

                    <div id="friendship-info">
                      <ul>
                        <li>
                          <span>{friend.fname}</span>
                          <span>{friend.lname}</span>
                        </li>
                        <li>{friend.religion}</li>
                      </ul>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendsExpanded;
