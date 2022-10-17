import React from "react";
import "./style.css";

class PublishButton extends React.Component {
  render() {
    const { btn, onNewRequest } = this.props;

    return (
      <button id="send-request" onClick={(e) => onNewRequest(e)}>
        {btn}
      </button>
    );
  }
}

export default PublishButton;
