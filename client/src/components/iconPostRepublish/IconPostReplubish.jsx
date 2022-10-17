import React from "react";
import Tooltip from "../tooltip/Tooltip";

class IconPostReplubish extends React.Component {
  render() {
    const { post_id, section } = this.props.properties;
    const { handleUpdatePostStatus } = this.props.functions;

    return (
      <React.Fragment>
        {section === "deleted" ? (
          <>
            <span
              onClick={() =>
                handleUpdatePostStatus({
                  status: "published",
                  post_id: post_id,
                })
              }
              id="prayer-deleted"
              className="icons"
            >
              <i className="fas fa-trash-restore"></i>
            </span>

            <Tooltip msg={"republish"} />
          </>
        ) : null}
      </React.Fragment>
    );
  }
}

export default IconPostReplubish;
