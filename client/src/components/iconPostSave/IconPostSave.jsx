import React from "react";
import "./style.css";

class IconPostSave extends React.Component {
  render() {
    const { save, user_id, post_id, onHandlePostBookmark } = this.props;
    return (
      <span
        id={save.class}
        onClick={() =>
          onHandlePostBookmark({
            user_id: user_id,
            post_id: post_id,
          })
        }
      >
        <span>
          <span>
            <i className={`fas fa-${save.icon}`}></i>
          </span>
          <span className="tooltip">{save.class}</span>
        </span>
      </span>
    );
  }
}

export default IconPostSave;
