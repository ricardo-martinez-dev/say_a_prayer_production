import React from "react";
import Tooltip from "../tooltip/Tooltip";

class IconPostRead extends React.Component {
  state = {};
  render() {
    const { onDisplayPost, onSectionToggle, onPopUpPost } =
      this.props.functions;
    const { id } = this.props.properties;

    return (
      <span>
        <span
          id="read"
          className="icons"
          onClick={() => {
            onPopUpPost({ postId: id });
          }}
        >
          <i className="fas fa-book-reader"></i>
        </span>

        <Tooltip msg="read" />
      </span>
    );
  }
}

export default IconPostRead;
