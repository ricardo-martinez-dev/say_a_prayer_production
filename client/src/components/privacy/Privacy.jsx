import "./style.css";
import React from "react";
import axios from "axios";
import Spinner from "../spinner/Spinner";
require("dotenv").config();

class Privacy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      themes: null,
      isLoading: true,
      theme: null,
      chosenTheme: null,
      privacy: null,
    };
  }

  async componentDidMount() {
    const { user_id } = this.props.properties.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/settings/${user_id}`;
    const privacy = await axios
      .get(url)
      .then((res) => res.data[0].privacy)
      .catch((err) => console.log(err));

    this.setState({ privacy, isLoading: false });
  }

  handlePrivacySelector = async (obj) => {
    let privacy = {};

    for (const property in this.state.privacy) {
      if (obj.c === property) {
        const val = this.state.privacy[obj.c] === true ? false : true;

        privacy[property] = val;
      } else {
        privacy[property] = this.state.privacy[property];
      }
    }

    this.setState({ privacy });

    // TODO : update privacy in db

    const url = `${process.env.REACT_APP_API_URL}/post/privacy`;
    const elem = {
      user_id: this.props.properties.userInfo.user_id,
      password: this.props.properties.userInfo.password,
      privacy,
    };

    await axios
      .post(url, elem)
      .then((res) => res)
      .catch((err) => console.log(err));
  };

  render() {
    const { privacy } = this.state;
    const list = [
      "sponsorship",
      "age",
      "city",
      "country",
      "denomination",
      "religion",
    ];

    const functions = {
      handlePrivacySelector: this.handlePrivacySelector,
    };

    return (
      <div
        id="privacy"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>Privacy</h2>

        {privacy ? (
          <div id="privacy-holder">
            <div className="privacy-options">
              <ul>
                {list.map((el, i) => {
                  const foo = `show${el[0].toUpperCase() + el.substring(1)}`;
                  return (
                    <List
                      a={privacy[foo]}
                      b={el}
                      c={foo}
                      functions={functions}
                      key={i}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

class List extends React.Component {
  render() {
    const { a, b, c } = this.props;
    const { handlePrivacySelector } = this.props.functions;

    const foo = a ? "selected" : "not-selected";
    return (
      <li>
        <span>
          <div
            className={`selector ${foo}`}
            onClick={() => handlePrivacySelector({ a, c })}
          >
            {a ? <i className="fas fa-times"></i> : ""}
          </div>
          show {b}
        </span>
      </li>
    );
  }
}

export default Privacy;
