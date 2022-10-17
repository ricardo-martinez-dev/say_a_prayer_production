import "./style.css";
import React from "react";
import NavList from "../navList/NavList";
import audio from "../../media/audio/ring.mp3";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasNotifications: null,
      playRing: false,
      isLoading: true,
      nav: null,
    };
  }

  checkNotifications = async () => {
    const { user_id } = this.props.properties.userInfo;

    if (!user_id) return;

    const url = `${process.env.REACT_APP_API_URL}/notifications/${user_id}`;
    const res = await axiosFetch.axiosGet({ url });

    return res;
  };

  clearNotifications = async (obj) => {
    if (obj !== "notifications") return;

    const { user_id } = this.props.properties.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/notifications/clear/${user_id}`;

    this.setState({ hasNotifications: false });

    const res = await axiosFetch.axiosGet({ url });

    return res;
  };

  fetchNotifications = async () => {
    const hasNotifications = await this.checkNotifications();
    this.setState({ hasNotifications, isLoading: false });
  };

  fetchNav = async () => {
    let { user_id } = this.props.properties.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/nav/${user_id}`;
    const nav = await axiosFetch.axiosGet({ url });

    this.setState({ nav });
  };

  // toggle nav section view
  handleHideNavSection = (section) => {
    const currentFilter = this.state.nav.filter;
    const includesSection = currentFilter.includes(section);

    if (includesSection) {
      currentFilter.forEach((fil, i) => {
        if (fil === section) currentFilter.splice(i, 1);
      });
    } else currentFilter.push(section);

    this.setState({
      nav: {
        ...this.state.nav,
        filter: currentFilter,
      },
    });
  };

  // toggle sections
  handleGetSectionName = async (obj) => {
    const display = obj.name.replace(" ", "");
    const section = obj.section.replace(" ", "");
    const profile = display === "profile";

    /* ----- profile ----- */
    if (profile) await this.handleShowUserProfile();

    this.setState({ currentlyDisplayed: display, currentSection: section });
  };

  handleDefineNavClass = () => {
    const viewportWidth = window.innerWidth;

    const classes =
      viewportWidth > 1050
        ? "show-nav"
        : this.props.properties.nav.isVisible
        ? "show-nav"
        : "hide-nav";

    return classes;
  };

  // todo : make notification ring
  handleRingNotification = async () => {
    let { user_id, password } = this.props.properties.userInfo;
    const { onPopNotification } = this.props.functions;

    const url = `${process.env.REACT_APP_API_URL}/notifications/ring`;
    const obj = { user_id, password };
    const res = await axiosFetch.axiosPost({ url, obj });

    if (!res && this.state.hasNotifications) {
      onPopNotification(this.state.hasNotifications);

      const ringTone = new Audio(audio);
      ringTone.play();

      this.setState({ playRing: false });

      const url = `${process.env.REACT_APP_API_URL}/notifications/unring`;
      const obj = { user_id, password };

      await axiosFetch.axiosPost({ url, obj });
    }
  };

  async componentDidMount() {
    await this.fetchNav();
    await this.fetchNotifications();
    this.handleRingNotification();

    const intervalId = setInterval(async () => {
      await this.fetchNotifications();
      this.handleRingNotification();
    }, 5000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    if (this.state.isLoading) return null;

    const { sections, filter } = this.state.nav;
    let { functions, properties } = this.props;

    functions.clearNotifications = this.clearNotifications;

    const classes = this.handleDefineNavClass();

    return (
      <nav id="nav" className={classes}>
        <h1>
          <span> Say a Prayer</span>
          <span
            id="nav-close"
            onClick={() => {
              this.props.functions.onHidenav();
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
        </h1>
        {sections.map((elem, index) => {
          let icon = "down";
          let temp = null;

          filter.forEach((fil) => {
            const sec = elem.section;
            if (sec.includes(fil)) {
              temp = fil;
              icon = "up";
            }
          });

          return (
            <div key={index} id="nav-section">
              <p
                onClick={() => this.handleHideNavSection(elem.section)}
                id="nav-section"
              >
                <span>{elem.section}</span>
                <span>
                  <i className={`fas fa-chevron-${icon}`}></i>
                </span>
              </p>

              {temp !== null ? (
                <ul>
                  {elem.options.map((opt, i) => (
                    <NavList
                      opt={opt}
                      elem={elem}
                      index={i}
                      key={i}
                      properties={properties}
                      functions={functions}
                      notifications={this.state.hasNotifications}
                    />
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
      </nav>
    );
  }
}

export default Nav;
