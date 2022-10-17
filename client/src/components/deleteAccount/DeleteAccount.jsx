import "./style.css";
import React from "react";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class DeleteAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUnderstood: false,
    };
  }

  // TODO : same function as in newPost.jsx
  handleDeleteAccount = async () => {
    const { user_id } = this.props.properties.userInfo;

    const obj = { user_id };

    const permissionUrl = `${process.env.REACT_APP_API_URL}/deleteuser/permission`;
    const permissionToDelete = await axiosFetch.axiosPost({
      url: permissionUrl,
      obj,
    });

    if (!permissionToDelete.allowDeletion) {
      alert("Deleting this account is not allowed");
      this.setState({ isUnderstood: false });
      return;
    }

    const r = window.confirm("Are you sure you want to delete this account?");

    if (!r) return;

    const userDeleteUrl = `${process.env.REACT_APP_API_URL}/deleteuser`;
    const res = await axiosFetch.axiosPost({ url: userDeleteUrl, obj });

    // ----------- DELETED CODE HERE ----------- //
    // ----------- DELETED CODE HERE ----------- //
    // ----------- DELETED CODE HERE ----------- //
  };

  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({ [name]: this.state.isUnderstood ? false : true });
  };

  render() {
    return (
      <div
        id="donate-account"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>Delete Account</h2>

        <div id="donation">
          <div id="understand">
            <input
              type="checkbox"
              id="understand"
              name="isUnderstood"
              checked={this.state.isUnderstood}
              onChange={(event) => this.handleChange(event)}
            />

            <p id="message" htmlFor="vehicle1">
              I understand that I can not recover my account nor any of its
              contents.
            </p>
          </div>

          <button
            className={`donate ${
              this.state.isUnderstood ? "enabled" : "disabled"
            }`}
            disabled={this.state.isUnderstood ? false : true}
            onClick={() => this.handleDeleteAccount()}
          >
            delete
          </button>
        </div>
      </div>
    );
  }
}

export default DeleteAccount;
