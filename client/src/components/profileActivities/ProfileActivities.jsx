import axios from "axios";
import React from "react";
import "./style.css";
import Spinner from "../spinner/Spinner";
import ProfileActivitiesHeader from "../profileActivitiesHeader/ProfileActivitiesHeader";
import ProfileActivitiesRequests from "../profileActivitiesRequest/ProfileActivitiesRequests";
import ProfileActivitiesSentPrayers from "../profileActivitiesSentPrayers/ProfileActivitiesSentPrayers";
import ProfileActivitiesReceivedPrayers from "../profileActivitiesReceivedPrayers/ProfileActivitiesReceivedPrayers";
import UserPublications from "../UserPublications/UserPublications";
require("dotenv").config();

class ProfileActivities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      requests: null,
      posts: null,
      answered: null,
      sentPrayers: null,
      receivedPrayers: null,
      publicationTarget: null,
      isOpen: false,
    };
  }

  getActivities = async (obj) => {
    const url = `${process.env.REACT_APP_API_URL}/activities/${obj.url}`;
    const res = await axios
      .get(url, {
        params: {
          user_id: obj.user_id,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    return res;
  };

  handleSeeMore = async (obj) => {
    this.setState({
      isOpen: true,
      publicationTarget: obj.src,
    });
  };

  handleLeaveLastPublications = () => {
    this.setState({
      isOpen: false,
      publicationTarget: null,
    });
  };

  async componentDidMount() {
    const { userId } = this.props;

    const requests = await this.getActivities({
      url: "requests",
      user_id: userId,
    });

    const posts = await this.getActivities({
      url: "posts",
      user_id: userId,
    });

    const answered = await this.getActivities({
      url: "answered",
      user_id: userId,
    });

    const sentPrayers = await this.getActivities({
      url: "prayers/sent",
      user_id: userId,
    });

    const receivedPrayers = await this.getActivities({
      url: "prayers/received",
      user_id: userId,
    });

    this.setState({
      requests,
      posts,
      answered,
      sentPrayers,
      receivedPrayers,
      isLoading: false,
    });
  }

  render() {
    const { requests, posts, receivedPrayers, sentPrayers, isOpen, isLoading } =
      this.state;
    const answeredRequests = this.state.answered;
    const { user_id } = this.props.properties.userInfo;
    const functions = {
      ...this.props.functions,
      onSeeMore: this.handleSeeMore,
      onLeaveLastPublications: this.handleLeaveLastPublications,
    };

    return (
      <div>
        {isLoading && (
          <div id="spinner">
            <Spinner />
          </div>
        )}

        {!isOpen && !isLoading && (
          <>
            {requests &&
              requests.length <= 0 &&
              receivedPrayers &&
              receivedPrayers.length <= 0 &&
              sentPrayers &&
              sentPrayers.length <= 0 &&
              answeredRequests &&
              answeredRequests.length <= 0 &&
              posts &&
              posts.length <= 0 && (
                <div>
                  <h2>Nothing to display</h2>
                </div>
              )}

            {requests && requests.length > 0 && (
              <React.Fragment key={1}>
                <ProfileActivitiesHeader
                  properties={{ src: "last requests" }}
                  functions={functions}
                />
                <div className="box">
                  {requests.map((req, i) => (
                    <ProfileActivitiesRequests
                      req={req}
                      functions={functions}
                      key={i}
                      target="request"
                      properties={this.props.properties}
                    />
                  ))}
                </div>
              </React.Fragment>
            )}

            {answeredRequests && answeredRequests.length > 0 && (
              <React.Fragment key={2}>
                <ProfileActivitiesHeader
                  properties={{ src: "last answered requests" }}
                  functions={functions}
                />
                <div className="box">
                  {answeredRequests.map((req, i) => (
                    <ProfileActivitiesRequests
                      req={req}
                      functions={functions}
                      key={i}
                      target="request"
                      properties={this.props.properties}
                    />
                  ))}
                </div>
              </React.Fragment>
            )}

            {posts && posts.length > 0 && (
              <React.Fragment key={3}>
                <ProfileActivitiesHeader
                  properties={{ src: "last posts" }}
                  functions={functions}
                />
                <div className="box">
                  {posts.map((req, i) => {
                    const { abuse, _id } = req;
                    if (abuse.includes(user_id)) return;

                    return (
                      <ProfileActivitiesRequests
                        req={req}
                        functions={functions}
                        key={i}
                        target="post"
                        properties={this.props.properties}
                      />
                    );
                  })}
                </div>
              </React.Fragment>
            )}

            {sentPrayers && sentPrayers.length > 0 && (
              <React.Fragment key={4}>
                <ProfileActivitiesHeader
                  properties={{ src: "last sent prayers" }}
                  functions={functions}
                />
                <div className="box">
                  {sentPrayers.map((req, i) => (
                    <ProfileActivitiesSentPrayers
                      req={req}
                      functions={functions}
                      key={i}
                      properties={this.props.properties}
                    />
                  ))}
                </div>
              </React.Fragment>
            )}

            {}
            {receivedPrayers && receivedPrayers.length > 0 && (
              <React.Fragment key={5}>
                <ProfileActivitiesHeader
                  properties={{ src: "last received prayers" }}
                  functions={functions}
                />

                <div className="box">
                  {receivedPrayers.map((req, i) => (
                    <ProfileActivitiesReceivedPrayers
                      req={req}
                      functions={functions}
                      key={i}
                      properties={this.props.properties}
                    />
                  ))}
                </div>
              </React.Fragment>
            )}
          </>
        )}

        {isOpen && (
          <UserPublications
            userId={this.props.userId}
            functions={functions}
            target={this.state.publicationTarget}
            properties={this.props.properties}
          />
        )}
      </div>
    );
  }
}

export default ProfileActivities;
