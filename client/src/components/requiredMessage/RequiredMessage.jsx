import "./style.css";
import React from "react";

class RequiredMessage extends React.Component {
  state = {};

  render() {
    const { input } = this.props;

    const isArray = Array.isArray(input);
    let isRequired;
    const msg = <span id="require-msg">( required )</span>;

    if (isArray) {
      const res = input.length <= 3 ? input : input.slice(0, 3);
      isRequired =
        res[0] == "" || input.length == 0 || input == "undefined" ? msg : null;
    } else {
      isRequired =
        !input || input.length == 0 || input == "undefined" ? msg : null;
    }

    return isRequired;
  }
}

export default RequiredMessage;
