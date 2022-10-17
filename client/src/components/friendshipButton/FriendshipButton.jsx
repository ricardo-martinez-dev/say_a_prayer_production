import "./style.css";
import React from "react";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class FriendshipButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendship: null,
      isLoading: true,
    };
  }

  fetchFriendshipStatus = async () => {
    const { user_id, communityMember, password } = this.props.properties;
    const url = `${process.env.REACT_APP_API_URL}/friendship/status`;
    const obj = { user_id, password, communityMember };
    const res = await axiosFetch.axiosPost({ url, obj });

    this.setState({ friendship: res });
  };

  updateFriendshipStatus = async (obj) => {
    const { user_id, password, communityMember, event } = obj;
    // TODO : update friendship status
    const url = `${process.env.REACT_APP_API_URL}/friendship/update`;
    const newObj = { user_id, password, communityMember, event };
    const res = await axiosFetch.axiosPost({ url, obj: newObj });

    this.setState({ friendship: res });
  };

  handleBefriend = async () => {
    const { user_id, communityMember, password } = this.props.properties;

    this.setState({
      friendship: { ...this.props.properties, status: "sent" },
    });

    this.updateFriendshipStatus({
      user_id,
      password,
      communityMember,
      event: "sent",
    });
  };

  handleCancel = async () => {
    const { user_id, communityMember, password } = this.props.properties;

    this.setState({ friendship: null });
    this.updateFriendshipStatus({
      user_id,
      password,
      communityMember,
      event: "cancel",
    });
  };

  handleUnfriend = async () => {
    const { user_id, password, communityMember } = this.props.properties;
    const prompt = window.confirm(
      "Are you sure you want to unfriend this person?"
    );

    if (prompt) {
      this.setState({ friendship: null });
      this.updateFriendshipStatus({
        user_id,
        password,
        communityMember,
        event: "unfriend",
      });
    }
  };

  handleReject = async () => {
    const { user_id, password, communityMember } = this.props.properties;
    this.setState({ friendship: null });
    this.updateFriendshipStatus({
      user_id,
      password,
      communityMember,
      event: "reject",
    });
  };

  handleAccept = async () => {
    const { user_id, password, communityMember } = this.props.properties;

    this.setState({
      friendship: { ...this.props.properties, status: "accepted" },
    });

    this.updateFriendshipStatus({
      user_id,
      password,
      communityMember,
      event: "accept",
    });
  };

  async componentDidMount() {
    await this.fetchFriendshipStatus();
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading) return null;
    const { friendship } = this.state;
    const { elem } = this.props;
    const { user_id } = this.props.properties;

    return (
      <div id="friendship-btn">
        {elem !== "members" && <p id="header">Friendship Request</p>}

        <div id="buttons" className={elem}>
          {!friendship && (
            <Button type="befriend" onFriendshipHandle={this.handleBefriend} />
          )}

          {friendship &&
            friendship.status === "sent" &&
            friendship.from_user === user_id && (
              <Button type="cancel" onFriendshipHandle={this.handleCancel} />
            )}

          {friendship && friendship.status === "accepted" ? (
            <Button type="unfriend" onFriendshipHandle={this.handleUnfriend} />
          ) : null}

          {friendship &&
          friendship.status === "sent" &&
          friendship.to_user === user_id ? (
            <React.Fragment>
              <Button type="accept" onFriendshipHandle={this.handleAccept} />
              <Button type="reject" onFriendshipHandle={this.handleReject} />
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}

class Button extends React.Component {
  state = {};
  render() {
    const { type, onFriendshipHandle } = this.props;
    return (
      <button id={type} onClick={() => onFriendshipHandle()}>
        {type}
      </button>
    );
  }
}

export default FriendshipButton;
