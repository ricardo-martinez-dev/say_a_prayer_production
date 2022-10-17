import React from "react";

class ElementName extends React.Component {
  state = {};
  render() {
    const { name } = this.props.properties;

    const style = {
      textTransform: "capitalize",
      textAlign: "center",
      fontWeight: "bold",
    };
    return (
      <p id="elem-name" style={style}>
        {name}
      </p>
    );
  }
}

export default ElementName;
