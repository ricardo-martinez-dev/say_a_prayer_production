import "./style.css";
import React, { Component } from "react";

class ButtonScrollTop extends Component {
  scrollToTop = (elem) => {
    const target = document.querySelector(elem);
    target.scrollTop = 0; // For Safari
    target.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  render() {
    const elem = this.props.target;
    return (
      <div id="back-to-top">
        <button onClick={() => this.scrollToTop(elem)}>Back to Top</button>
      </div>
    );
  }
}

export default ButtonScrollTop;
