import React from "react";
import Tooltip from "../tooltip/Tooltip";

class IconPostReadDeleted extends React.Component {
  render() {
    const { post_id, section } = this.props.properties;
    const { onDisplayPost, onSectionToggle } = this.props.functions;

    return (
      <React.Fragment>
        {section === "deleted" ? (
          <span>
            <span
              onClick={() => {
                onDisplayPost(post_id);
                onSectionToggle({ to: "post" });
              }}
              id="prayer-info"
            >
              <i className="fas fa-book-reader"></i>
            </span>

            <Tooltip msg={"view"} />
          </span>
        ) : null}
      </React.Fragment>
    );
  }
}

export default IconPostReadDeleted;
