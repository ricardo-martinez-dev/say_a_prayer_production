import "./style.css";
import React from "react";
import axios from "axios";
import Spinner from "../spinner/Spinner";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class Themes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSponsor: false,
      themes: null,
      theme: null,
      chosenTheme: null,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { chosenTheme } = this.props.properties.accountSettings;
    const { user_id } = this.props.properties.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/membership/${user_id}`;
    const isSponsor = await axiosFetch.axiosGet({ url });

    this.setState({ chosenTheme, isSponsor });
    this.fetchListOfThemes();
  }

  // fetch list of themes
  fetchListOfThemes = async () => {
    const url = `${process.env.REACT_APP_API_URL}/themes`;
    const themes = await axiosFetch.axiosGet({ url });

    this.setState({ themes });
  };

  updateThemeNameHighlight = async (obj) => {
    const { user_id, password } = this.props.properties.userInfo;
    const chosenTheme = obj.themeName;
    this.setState({ chosenTheme });

    this.updateThemeInAccountSettings(chosenTheme);
  };

  updateThemeInAccountSettings = async (chosenTheme) => {
    const { user_id, password } = this.props.properties.userInfo;

    const url = `${process.env.REACT_APP_API_URL}/themes`;
    const obj = { user_id, password, chosenTheme };
    const res = await axios
      .post(url, obj)
      .then((res) => res)
      .catch((err) => console.log(err));
  };

  render() {
    const { themes } = this.state;
    const { chosenTheme } = this.state;
    const { onUpdateTheme } = this.props.functions;

    return (
      <div
        id="themes"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>Themes</h2>

        {!themes ? (
          <Spinner />
        ) : (
          <div id="themes-holder">
            <div id="chosen-theme">
              <div id="name">Current Theme: </div>
              <div id="theme"></div>
            </div>

            <div className="theme-options">
              <ul>
                {themes.map((theme) => (
                  // TODO : get theme names and colors from db
                  <li
                    key={theme._id}
                    className={`${
                      theme.themeName === chosenTheme ? "border" : "no-border"
                    }`}
                    onClick={() => {
                      onUpdateTheme(theme);
                      this.updateThemeNameHighlight(theme);
                    }}
                  >
                    <span
                      style={{ background: theme["elem-bg"] }}
                      className="theme-selector"
                    ></span>
                    <span className="theme-name">{theme.themeName}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Themes;
