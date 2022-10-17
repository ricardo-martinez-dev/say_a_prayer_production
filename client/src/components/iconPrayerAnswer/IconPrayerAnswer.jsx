import React from "react";
import Tooltip from "../tooltip/Tooltip";

class IconPrayerAnswer extends React.Component {
  render() {
    const { onLoadPrayers, handleSetAsAnswered } = this.props.functions;
    const { _id, user_id, showInput, section, category } =
      this.props.properties;

    const userRequests = section === "yourrequests" ? true : false;
    const answer = category === "requested" && userRequests;

    return (
      <React.Fragment>
        {answer && !showInput ? (
          <span
            onClick={() => {
              onLoadPrayers(_id);
              handleSetAsAnswered({ _id, user_id });
            }}
          >
            <span>
              <i className="fas fa-child" id="prayer-answer"></i>
            </span>
            <Tooltip msg="answered" />
          </span>
        ) : null}
      </React.Fragment>
    );
  }
}

export default IconPrayerAnswer;
