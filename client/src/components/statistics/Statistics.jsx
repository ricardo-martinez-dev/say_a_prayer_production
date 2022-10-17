import "./style.css";
import React from "react";

class Statistics extends React.Component {
  render() {
    return (
      <div
        id="statistics"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>Statistics</h2>

        <div id="statistics-holder"></div>
      </div>
    );
  }
}

export default Statistics;
