import React from "react";
import Tooltip from "../tooltip/Tooltip";

class IconPostDelete extends React.Component {
  render() {
    const { post_id, section } = this.props.properties;
    const { handleUpdatePostStatus } = this.props.functions;

    return (
      <React.Fragment>
        {section === "published" ? (
          <>
            <span
              onClick={() =>
                handleUpdatePostStatus({ status: "deleted", post_id })
              }
              id="prayer-trash"
              className="icons"
            >
              <i className="fas fa-trash"></i>
            </span>

            <Tooltip msg={"delete"} />
          </>
        ) : null}
      </React.Fragment>
    );
  }
}

export default IconPostDelete;
