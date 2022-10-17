import "./style.css";
import React from "react";

class Tags extends React.Component {
  render() {
    const { tags } = this.props;

    return (
      <li id="tags">
        {tags
          ? tags.map((tag, i) => (
              <span className="tag" key={i}>
                #{tag}
              </span>
            ))
          : null}
      </li>
    );
  }
}

export default Tags;
