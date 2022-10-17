import React from "react";
import "./style.css";

class PostContent extends React.Component {
  render() {
    const { content } = this.props;

    return (
      <React.Fragment>
        {content.map((c, i) => (
          <p id="post-content" key={i}>
            {c}
          </p>
        ))}
      </React.Fragment>
    );
  }
}

export default PostContent;
