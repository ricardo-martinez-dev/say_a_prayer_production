import React from "react";
import Tooltip from "../tooltip/Tooltip";

class IconAbuse extends React.Component {
  render() {
    const { handleReportAbuse } = this.props.functions;
    const { showInput, _id, category, section } = this.props.properties;

    const communityRequests = section === "communityrequests" ? true : false;

    const report =
      (category !== "deleted" && communityRequests) ||
      (category !== "deleted" && !section);

    return (
      <React.Fragment>
        {report && !showInput ? (
          <span>
            <span onClick={() => handleReportAbuse(_id)}>
              <i className="fas fa-exclamation-triangle" id="prayer-report"></i>
            </span>

            {this.props.children ? (
              this.props.children
            ) : (
              <Tooltip msg="report abuse" />
            )}
          </span>
        ) : null}
      </React.Fragment>
    );
  }
}

export default IconAbuse;
