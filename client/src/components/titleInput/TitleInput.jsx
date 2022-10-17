import React from "react";
import RequiredMessage from "../requiredMessage/RequiredMessage";
import "./style.css";

class TitleInput extends React.Component {
  render() {
    const { onInputChange, target } = this.props;
    const { title } = this.props.properties;

    const isRequired = <RequiredMessage input={title} />;

    return (
      <React.Fragment>
        <p id="req-input">Title {isRequired}</p>
        <input
          type="text"
          value={title}
          onChange={onInputChange}
          required
          maxLength={target === "post" ? 100 : 70}
          minLength="1"
        />
      </React.Fragment>
    );
  }
}

export default TitleInput;
