import React from "react";
import Tooltip from "../tooltip/Tooltip";

class IconPrayerDeleteRestore extends React.Component {
  render() {
    const { onLoadPrayers, handleRestoreRequest } = this.props.functions;
    const { category, showInput, _id, user_id } = this.props.properties;

    const restoreDelete = category === "deleted";

    return (
      <React.Fragment>
        {restoreDelete && !showInput ? (
          <span>
            <span
              onClick={() => {
                onLoadPrayers(_id);
                handleRestoreRequest({ _id, user_id, src: "deleted" });
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

export default IconPrayerDeleteRestore;
