import "./style.css";
import React from "react";
import Spinner from "../spinner/Spinner";
require("dotenv").config();

class Verse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      verse: {},
    };
  }

  async componentDidMount() {
    const url = `${process.env.REACT_APP_API_URL}/verse`;
    const verse = await fetch(url)
      .then((res) => res.json())
      .then((data) => data[0]);

    this.setState({ verse });
  }

  render() {
    const { reference, verse } = this.state.verse;

    return (
      <React.Fragment>
        {verse ? (
          <div className="verse" data-testid="test-verse">
            "{verse}" - {reference[0].toUpperCase() + reference.substring(1)}
          </div>
        ) : (
          <Spinner />
        )}
      </React.Fragment>
    );
  }
}

export default Verse;
