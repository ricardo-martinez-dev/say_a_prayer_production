import React from "react";

class DateComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      day: null,
      month: null,
      year: null,
    };
  }

  getDate = () => {
    const { date } = this.props;

    let newDate = new Date(0);
    newDate.setUTCMilliseconds(date);
    newDate = newDate.toUTCString().substring(0, 25);

    this.setState({
      date: newDate,
    });
  };

  async componentDidMount() {
    this.getDate();
  }

  render() {
    const { date } = this.state;

    return <span id="date">{date}</span>;
  }
}

export default DateComp;
