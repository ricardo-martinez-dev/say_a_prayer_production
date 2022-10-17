import React from "react";
import Tooltip from "../tooltip/Tooltip";

class IconPrayerInfo extends React.Component {
  render() {
    const { prayer, showInput } = this.props.properties;
    const { onPopUpPrayer } = this.props.functions;

    return (
      <React.Fragment>
        {!showInput ? (
          <span
            onClick={async () => {
              onPopUpPrayer({ prayer });
            }}
          >
            <span>
              <i className="fas fa-info" id="prayer-info"></i>
            </span>
            <Tooltip msg="info" />
          </span>
        ) : null}
      </React.Fragment>
    );
  }
}

export default IconPrayerInfo;
