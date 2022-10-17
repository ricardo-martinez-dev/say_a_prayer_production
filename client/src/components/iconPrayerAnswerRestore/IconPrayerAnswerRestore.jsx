import React from "react";
import Tooltip from "../tooltip/Tooltip";

class IconPrayerAnswerRestore extends React.Component {
  render() {
    const { onLoadPrayers, handleRestoreRequest } = this.props.functions;
    const { _id, user_id, category, section, showInput } =
      this.props.properties;

    const userRequests = section === "yourrequests" ? true : false;
    const restoreAnswered = category === "answered" && userRequests;

    return (
      <React.Fragment>
        {restoreAnswered && !showInput ? (
          <span>
            <span
              onClick={() => {
                onLoadPrayers(_id);
                handleRestoreRequest({ _id, user_id, src: "answered" });
              }}
            >
              <i className="fas fa-trash-restore" id="prayer-deleted"></i>
            </span>
            <Tooltip msg="restore" />
          </span>
        ) : null}
      </React.Fragment>
    );
  }
}

export default IconPrayerAnswerRestore;
