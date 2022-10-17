import "./style.css";
import React, { Component } from "react";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: null,
      avatar: null,
    };
  }

  fetchAvatar = async () => {
    const { user_id, password } = this.props;
    const url = `${process.env.REACT_APP_API_URL}/avatar`;
    const obj = { params: { user_id, password } };
    const avatar = await axiosFetch.axiosGet({ url, obj });

    this.setState({ avatar, user_id });
  };

  async componentDidMount() {
    await this.fetchAvatar();
  }

  render() {
    const { avatar, user_id } = this.state;

    const image = this.props.avatar ? this.props.avatar : avatar;
    const { onSectionToggle, onShowMemberProfile, onEnableBodyScroll } =
      this.props.functions;

    return (
      <div
        id="avatar"
        className="loading-img"
        onClick={async () => {
          await onShowMemberProfile({ user_id });
          // ----------- DELETED CODE HERE ----------- //
          // ----------- DELETED CODE HERE ----------- //
          // ----------- DELETED CODE HERE ----------- //
        }}
      >
        {avatar ? <img src={avatar} alt="" /> : null}
      </div>
    );
  }
}

export default Avatar;
