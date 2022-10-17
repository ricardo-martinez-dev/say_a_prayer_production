import "./style.css";
import React from "react";

class Tooltip extends React.Component {
  render() {
    if (window.innerWidth < 1050) return null;
    const { msg } = this.props;
    return <span className="tooltip">{msg}</span>;
  }
}

export default Tooltip;
