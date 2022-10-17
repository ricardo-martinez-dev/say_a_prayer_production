import React from "react";
import Tooltip from "../tooltip/Tooltip";

class IconPrayerPray extends React.Component {
  render() {
    const { handleInputDisplay } = this.props.functions;
    const { showInput, section, category } = this.props.properties;

    const communityRequests = section === "communityrequests" ? true : false;
    const pray =
      (category === "requested" && communityRequests) ||
      (category === "requested" && !section);

    return (
      <React.Fragment>
        {pray && !showInput ? (
          <span onClick={() => handleInputDisplay()}>
            <span>
              <i className="fas fa-praying-hands" id="prayer-send"></i>
            </span>
            <Tooltip msg="pray" />
          </span>
        ) : null}
      </React.Fragment>
    );
  }
}

export default IconPrayerPray;
