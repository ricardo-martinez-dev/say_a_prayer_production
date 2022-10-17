import React from "react";
import RequiredMessage from "../requiredMessage/RequiredMessage";
import "./style.css";

class PostContentInput extends React.Component {
  render() {
    const { onInputChange } = this.props;
    const { description } = this.props.properties;

    const isRequired = <RequiredMessage input={description} />;

    return (
      <React.Fragment>
        <p id="post-content-input">Content {isRequired}</p>
        <textarea
          name="request-body"
          id="request-body-textarea"
          value={description}
          onChange={onInputChange}
          maxLength="10000"
          required
        />
      </React.Fragment>
    );
  }
}

export default PostContentInput;
