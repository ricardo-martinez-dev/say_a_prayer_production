import React from "react";
import "./style.css";
require("dotenv").config();

class DeleteAccount extends React.Component {
  render() {
    const { onLogOut } = this.props.functions;
    return (
      <div
        id="logout"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>Log Out</h2>

        <div id="logout-section">
          <button onClick={() => onLogOut()}>Log Out</button>
        </div>
      </div>
    );
  }
}

export default DeleteAccount;
