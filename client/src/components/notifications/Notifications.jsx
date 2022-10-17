import "./style.css";
import React from "react";
import Avatar from "../avatar/Avatar";
import IconPrayerInfo from "../iconPrayerInfo/IconPrayerInfo";
import Tooltip from "../tooltip/Tooltip";
import Spinner from "../spinner/Spinner";
const axios = require("axios");
require("dotenv").config();

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        user_id: null,
        email: null,
        password: null,
      },
      notifications: [],
      isLoading: true,
    };
  }

  handleAbuse = (obj) => {
    const prayers = this.state.notifications.prayers.filter(
      (not) => not._id !== obj._id
    );

    this.setState({ notifications: { ...this.state.notifications, prayers } });
  };

  handleUserInfo = async () => {
    const { user_id, email, password } = this.props.properties.userInfo;

    const userInfo = {
      user_id,
      email,
      password,
    };

    this.setState({ userInfo });
  };

  fetchNotifications = async () => {
    const url = `${process.env.REACT_APP_API_URL}/notifications/fetch`;
    const { user_id, email, password } = this.state.userInfo;

    const obj = {
      user_id,
      email,
      password,
    };

    const notifications = await axios
      .post(url, obj)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    this.setState({ notifications });
  };

  handleLike = async (el) => {
    try {
      this.state.notifications.prayers.filter(async (prayer) => {
        if (el._id !== prayer._id) return;
        prayer.isLiked = prayer.isLiked ? false : true;
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleRequest = (obj) => {
    const friendships = this.state.notifications.friendships.filter((frnd) => {
      const { user_id, communityMember } = obj;
      return frnd.from_user !== communityMember && frnd.to_user !== user_id;
    });

    const notifications = this.state.notifications;
    notifications.friendships = friendships;

    this.setState({ notifications });
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
    await this.fetchNotifications();

    this.setState({ isLoading: false });
  }

  render() {
    const { notifications, isLoading } = this.state;
    const { password, user_id } = this.props.properties.userInfo;
    const { onRepostPrayerAbuse, onLovePrayer } = this.props.functions;

    return (
      <div
        id="notifications"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>Notifications</h2>

        {isLoading && <Spinner />}

        {!isLoading && (
          <div id="notifications-prayers">
            {notifications.friendships.length === 0 &&
              notifications.prayers.length === 0 && (
                <p id="message">You don't have any notification</p>
              )}

            <ul id="notifications-friendship-request">
              {notifications.friendships.map((frnd) => {
                return (
                  <li
                    className="notifications-friendship-request"
                    key={frnd._id}
                  >
                    <div id="top">
                      <p id="friendship-request-header">Friendship Request</p>
                    </div>

                    <div id="bottom">
                      <div id="info">
                        <div id="left">
                          <Avatar
                            user_id={frnd.from_user}
                            functions={this.props.functions}
                            properties={this.props.properties}
                          />
                        </div>

                        <div id="middle">
                          <ul>
                            <li>
                              <span>Name:</span>
                              <span>
                                {frnd.fname} {frnd.lname}
                              </span>
                            </li>
                            <li>
                              <span>Country:</span>
                              <span>{frnd.country}</span>
                            </li>
                            <li>
                              <span>Religion:</span>
                              <span>{frnd.religion}</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div id="right">
                        <button
                          id="accept"
                          onClick={() =>
                            this.handleAccept({
                              communityMember: frnd.from_user,
                              user_id: frnd.to_user,
                            })
                          }
                        >
                          accept
                        </button>
                        <button
                          id="reject"
                          onClick={() =>
                            this.handleReject({
                              communityMember: frnd.from_user,
                              user_id: frnd.to_user,
                            })
                          }
                        >
                          reject
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <ul id="notifications-prayers-list">
              {notifications.prayers.map((prayer) => {
                return (
                  <li className="notifications-prayer" key={prayer._id}>
                    <div id="top">
                      <p id="notifications-header">Prayer</p>
                    </div>

                    <div id="blah">
                      <div id="img">
                        <Avatar
                          user_id={prayer.from_user}
                          functions={this.props.functions}
                          fromPage="notifications"
                          properties={this.props.properties}
                        />
                      </div>

                      <div id="content">
                        <ul>
                          <li>
                            <span>Date:</span>
                            <span>
                              {new Date(prayer.date)
                                .toUTCString()
                                .substring(0, 25)}
                            </span>
                          </li>
                          <li>
                            <span>Request:</span>
                            <span>{prayer.title}</span>
                          </li>
                          <li>
                            <span>Prayer:</span>
                            <span>{prayer.prayer}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <p className="buttons">
                      <IconPrayerInfo
                        properties={{
                          prayer: {
                            _id: prayer.request_id,
                            user_id: prayer.to_user,
                          },
                        }}
                        functions={this.props.functions}
                      />

                      <span>
                        <span
                          id="like"
                          onClick={() => {
                            this.handleLike(prayer);
                            onLovePrayer({ ...prayer, target: "prayer" });
                          }}
                          style={{
                            color: prayer.isLiked ? "red" : null,
                          }}
                        >
                          <i className="fa-solid fa-heart"></i>
                        </span>
                        <Tooltip
                          msg={prayer.isLiked ? "retrieve love" : "send love"}
                        />
                      </span>

                      <span
                        onClick={() => {
                          var r = window.confirm(
                            "Report this prayer as abusive?"
                          );

                          if (r) {
                            onRepostPrayerAbuse({
                              to_user: prayer.to_user,
                              from_user: prayer.from_user,
                              to_user: prayer.to_user,
                              prayer_id: prayer._id,
                              user_id,
                              password,
                            });

                            this.handleAbuse(prayer);
                          }
                        }}
                      >
                        <span id="prayer-report">
                          <i className="fa-solid fa-triangle-exclamation"></i>
                        </span>
                        <Tooltip msg="report abuse" />
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Notifications;
