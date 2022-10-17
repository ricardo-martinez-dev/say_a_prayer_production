import "./style.css";
import React from "react";

class RequestTitle extends React.Component {
  render() {
    const { title } = this.props;

    return <h3 className="request-title">{title}</h3>;
  }
}

export default RequestTitle;
