import "./style.css";
import React from "react";
import axios from "axios";
import ProfileActivitiesRequests from "../profileActivitiesRequest/ProfileActivitiesRequests";
import Spinner from "../spinner/Spinner";
import ProfileActivitiesSentPrayers from "../profileActivitiesSentPrayers/ProfileActivitiesSentPrayers";
import ProfileActivitiesReceivedPrayers from "../profileActivitiesReceivedPrayers/ProfileActivitiesReceivedPrayers";
require("dotenv").config();

class UserPublications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      publications: [],
      url: null,
    };
  }

  setUrl = () => {
    const { target, userId } = this.props;
    let foo;

    if (target === "last requests") foo = "requests/sent";
    else if (target === "last answered requests") foo = "requests/answered";
    else if (target === "last posts") foo = "posts";
    else if (target === "last sent prayers") foo = "prayers/sent";
    else if (target === "last received prayers") foo = "prayers/received";

    const url = `${process.env.REACT_APP_API_URL}/publications/last/${foo}/${userId}`;

    this.setState({ url });
  };

  fetchPublications = async () => {
    const url = this.state.url;
    const res = await axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    this.setState({ publications: res });
  };

  async componentDidMount() {
    await this.setUrl();
    this.fetchPublications();
  }

  render() {
    const { functions } = this.props;
    const { target } = this.props;
    const { publications } = this.state;

    return (
      <div
        id="last-publications"
        onClick={() => this.props.functions.onHidenav()}
      >
        <div id="last-publications-holder">
          <h3 id="last-publications">
            <span></span>
            <span>{target}</span>
            <span
              id="close-last-publications"
              onClick={() => {
                functions.onLeaveLastPublications();
                functions.onShowFriends();
              }}
            >
              <i className="fa-solid fa-circle-arrow-left"></i>
            </span>
          </h3>

          {target === "last sent prayers" ? (
            <>
              {publications.length > 0 ? (
                <div className="box">
                  {publications.map((req, i) => (
                    <ProfileActivitiesSentPrayers
                      req={req}
                      functions={functions}
                      key={i}
                    />
                  ))}
                </div>
              ) : (
                <Spinner />
              )}
            </>
          ) : target === "last received prayers" ? (
            <>
              {publications.length > 0 ? (
                <div className="box">
                  {publications.map((req, i) => (
                    <ProfileActivitiesReceivedPrayers
                      req={req}
                      functions={functions}
                      key={i}
                    />
                  ))}
                </div>
              ) : (
                <Spinner />
              )}
            </>
          ) : (
            <>
              {publications.length > 0 ? (
                <div className="box">
                  {publications.map((req, i) => (
                    <ProfileActivitiesRequests
                      req={req}
                      functions={functions}
                      key={i}
                    />
                  ))}
                </div>
              ) : (
                <Spinner />
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default UserPublications;
