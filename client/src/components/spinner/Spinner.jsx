import React from "react";
import "./style.css";

class Spinner extends React.Component {
  render() {
    const bgColor = this.props.bgColor ? this.props.bgColor : null;

    return (
      <div className="loadingio-spinner-spin-gylp1l3255">
        <div className="ldio-9p5svcaz1mm">
          <div>
            <div style={{ background: bgColor }}></div>
          </div>
          <div>
            <div style={{ background: bgColor }}></div>
          </div>
          <div>
            <div style={{ background: bgColor }}></div>
          </div>
          <div>
            <div style={{ background: bgColor }}></div>
          </div>
          <div>
            <div style={{ background: bgColor }}></div>
          </div>
          <div>
            <div style={{ background: bgColor }}></div>
          </div>
          <div>
            <div style={{ background: bgColor }}></div>
          </div>
          <div>
            <div style={{ background: bgColor }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Spinner;
