import React from "react";
import Tooltip from "../tooltip/Tooltip";

class IconPrayerDelete extends React.Component {
  render() {
    const { onLoadPrayers, handleDelete } = this.props.functions;
    const { _id, user_id, showInput, section, category } =
      this.props.properties;

    const userRequests = section === "yourrequests" ? true : false;
    const trash = category === "requested" && userRequests;

    return (
      <React.Fragment>
        {trash && !showInput ? (
          <span
            onClick={() => {
              onLoadPrayers(_id);
              handleDelete({ _id, user_id });
            }}
          >
            <span>
              <i className="fas fa-trash" id="prayer-trash"></i>
            </span>
            <Tooltip msg="delete" />
          </span>
        ) : null}
      </React.Fragment>
    );
  }
}

export default IconPrayerDelete;
