import React from "react";

class ExploreRequest extends React.Component {
  render() {
    return (
      <div id="prayer">
        <p className={this.props.isTitle ? "title" : null}>
          {this.props.prayer}
        </p>
      </div>
    );
  }
}

export default ExploreRequest;
