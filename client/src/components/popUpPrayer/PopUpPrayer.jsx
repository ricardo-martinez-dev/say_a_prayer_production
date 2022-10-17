import "./style.css";
import React from "react";
import { getDate } from "../../utils/date";
import Avatar from "../avatar/Avatar";
import PrayersForRequest from "../prayersForRequest/PrayersForRequest";
import Tooltip from "../tooltip/Tooltip";
import axios from "axios";
import RequiredMessage from "../requiredMessage/RequiredMessage";
import Spinner from "../spinner/Spinner";
import ButtonScrollTop from "../ButtonScrollTop/ButtonScrollTop";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class PopUpPrayer extends React.Component {
  constructor() {
    super();
    this.state = {
      prayer: {},
      prayers: [],
      user: null,
      newPrayer: "",
      showPrayerBox: false,
      isLoading: true,
    };
  }

  togglePrayerBoxVisibility = () => {
    const showPrayerBox = this.state.showPrayerBox ? false : true;
    this.setState({ showPrayerBox });
  };

  getRequest = async () => {
    const { _id } = this.props.properties.popUpPrayer.prayer;
    const url = `${process.env.REACT_APP_API_URL}/requests/${_id}`;

    const prayer = await axiosFetch.axiosGet({ url });

    this.setState({ prayer });
  };

  getPrayers = async () => {
    const { _id } = this.props.properties.popUpPrayer.prayer;
    const url = `${process.env.REACT_APP_API_URL}/prayers/${_id}`;
    const prayers = await fetch(url).then((res) => res.json());
    this.setState({ prayers: prayers.prayers, users: prayers.author_info });
  };

  getUserInfo = async () => {
    const { user_id } = this.props.properties.popUpPrayer.prayer;
    const url = `${process.env.REACT_APP_API_URL}/users/${user_id}`;
    const res = await fetch(url).then((res) => res.json());

    this.setState({ user: res });
  };

  // send prayer
  sendPrayer = async (obj) => {
    let { prayers } = this.state;
    const testPrayer = this.state.newPrayer.trim();
    if (!testPrayer || testPrayer == "" || testPrayer == "undefined") {
      alert("Prayer must be between 1 and 100 characters long!");
      return;
    }
    const newPrayer = {
      from_user: this.props.properties.userInfo.user_id,
      to_user: this.props.properties.popUpPrayer.prayer.user_id,
      prayer: this.state.newPrayer,
      request_id: this.props.properties.popUpPrayer.prayer._id,
      date: new Date(),
    };
    prayers.unshift(newPrayer);

    const urlOne = `${process.env.REACT_APP_API_URL}/prayers/new`;
    const one = await axios
      .post(urlOne, newPrayer)
      .then((res) => {
        return { res: res.data, status: 200 };
      })
      .catch((err) => {
        return { status: 400, res: err };
      });

    if (one.status == 400) return;

    // update ranking
    const urlTwo = `${process.env.REACT_APP_API_URL}/ranking/sent`;
    const two = await axios
      .post(urlTwo, newPrayer)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    this.setState({ newPrayer: "", prayers });
  };

  async componentDidMount() {
    if (!this.props.properties.popUpPrayer.prayer) return;
    await this.getRequest();
    await this.getUserInfo();
    await this.getPrayers();
    this.setState({ isLoading: false });
  }

  render() {
    if (!this.state.user) return null;
    const { title, description, createdAt, date } = this.state.prayer;
    const { newPrayer, isLoading } = this.state;
    const parsedDate = Date.parse(date);
    const { day, month, year } = getDate(parsedDate);
    const { user_id } = this.state.prayer;
    const { onPopUpPrayer, onHidenav } = this.props.functions;
    const isAnswered = this.state.prayer.status === "answered";
    const isRequired = <RequiredMessage input={newPrayer} />;

    return (
      <div
        id="popup-prayer"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2 id="top">Request Info</h2>

        {isLoading && <Spinner />}

        {!isLoading && (
          <div id="prayer-popup-holder">
            <div id="prayer-info-holder">
              <div id="prayer-info-top-box">
                <div
                  id="close"
                  onClick={() => {
                    onPopUpPrayer();
                  }}
                >
                  <i className="fas fa-times"></i>
                  <Tooltip msg={"Close"} />
                </div>

                <div id="info">
                  <Avatar
                    user_id={user_id}
                    functions={this.props.functions}
                    properties={this.props.properties}
                  />

                  <div id="user-info">
                    <ul>
                      <li>
                        <span>by :</span>
                        <span>
                          {this.state.user && this.state.userfname}
                          {this.state.user && this.state.userlname}
                        </span>
                      </li>
                      <li>
                        <span>on :</span>
                        <span>
                          {day} {month} {year}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div id="prayer">
                  <p id="header">{title}</p>
                  <p id="body">{description}</p>
                </div>
              </div>
            </div>

            <div
              id="popup-prayer-new-prayer"
              className={this.state.showPrayerBox ? "open-foo" : "close-foo"}
            >
              {isAnswered && (
                <h2>
                  I've been answered!{" "}
                  <span>
                    <i className="fa-regular fa-face-smile-wink"></i>
                  </span>
                </h2>
              )}

              {!isAnswered && this.state.showPrayerBox && (
                <div
                  id="popup-prayer-holder"
                  style={{
                    display: this.state.showPrayerBox ? "flex" : "none",
                  }}
                >
                  <p id="req-input">New Prayer {isRequired}</p>

                  <textarea
                    id="popup-prayer-prayer"
                    value={this.state.newPrayer}
                    onChange={(e) => {
                      this.setState({ newPrayer: e.target.value });
                    }}
                  />

                  <div id="buttons">
                    <button onClick={() => this.sendPrayer()} id="prayer-send">
                      Send
                    </button>
                    <button
                      onClick={() => this.togglePrayerBoxVisibility()}
                      id="prayer-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {!isAnswered && !this.state.showPrayerBox && (
                <div id="pray-button">
                  <button
                    id="pray"
                    onClick={() => {
                      this.togglePrayerBoxVisibility();
                    }}
                  >
                    Pray
                  </button>
                </div>
              )}
            </div>

            <div id="prayers-list">
              <h3>Received Prayers</h3>

              <div id="prayers">
                {this.state.prayers.map((p) => (
                  <PrayersForRequest
                    properties={p}
                    key={p._id}
                    users={this.state.users}
                    functions={this.props.functions}
                  />
                ))}
              </div>

              <ButtonScrollTop target="#prayer-popup-holder" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PopUpPrayer;
