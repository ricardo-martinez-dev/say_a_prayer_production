import React from "react";
import RequiredMessage from "../requiredMessage/RequiredMessage";
import "./style.css";

class RequestInput extends React.Component {
  render() {
    const { onInputChange } = this.props;
    const { description } = this.props.properties;

    const isRequired = <RequiredMessage input={description} />;

    return (
      <React.Fragment>
        <p id="req-input">Description {isRequired}</p>
        <textarea
          name="request-body"
          id="request-body-textarea"
          value={description}
          onChange={onInputChange}
          required
          maxLength={250}
          minLength="1"
        />
      </React.Fragment>
    );
  }
}

export default RequestInput;
