// USED

import "./style.css";
import React from "react";
import ExplorePost from "../explorePost/ExplorePost";
import ExplorePrayer from "../explorePrayer/ExplorePrayer";
import Spinner from "../spinner/Spinner";
require("dotenv").config();

class Explore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prayers: [],
      requests: [],
      page: 1,
      isLoading: true,
    };
  }

  // todo : DRY => same as in CommunityAnswers.jsx and CommunityRequests.jsx
  /* ----- Lazy Load ----- */

  fetchData = async () => {
    const { userId } = this.props.properties;
    const { page } = this.state;

    const url = `${process.env.REACT_APP_API_URL}/requests/explore/${page}`;
    let requests = await fetch(url).then((res) => res.json());

    requests = requests.filter((r) => !r.abuse.includes(userId));

    return requests;
  };

  lazyLoad = async () => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(this.#handleIntersect, options);
    observer.observe(document.querySelector("#loader"));
  };

  #handleIntersect = (entries) => {
    if (entries[0].isIntersecting) {
      const page = this.state.page + 1;
      this.setState({ page });

      this.createElments();
    }
  };

  createElments = async () => {
    let requests = await this.fetchData();
    requests = this.state.requests.concat(requests);

    this.setState({ requests });
  };

  /* ----- Lazy Load ----- */

  async componentDidMount() {
    await this.createElments();
    await this.lazyLoad();
    this.setState({ isLoading: false });
  }

  render() {
    const { requests, isLoading } = this.state;
    const { onShowMemberProfile, onDisplayPost } = this.props.functions;
    const { user_id } = this.props.properties.userInfo;
    const { functions } = this.props;
    const gotRequests = !isLoading && requests.length > 0;

    return (
      <div id="explore" className="sectionComponent">
        <h2>Explore</h2>

        {isLoading && <Spinner />}

        {!isLoading && !gotRequests && <p id="message">Nothing to display</p>}

        {gotRequests && (
          <div id="explore-area">
            {requests.map((prayer) => {
              const { abuse, _id } = prayer;
              if (abuse.includes(user_id)) return;
              const isPost = prayer.isPost;

              return (
                <React.Fragment
                  key={_id + Math.floor(Math.random() * (1000000 - 100) + 100)}
                >
                  {isPost ? (
                    <ExplorePost
                      properties={prayer}
                      user_id={user_id}
                      onShowMemberProfile={onShowMemberProfile}
                      onDisplayPost={onDisplayPost}
                      functions={functions}
                      mainProperties={this.props.properties}
                      section="explore"
                    />
                  ) : (
                    <ExplorePrayer
                      properties={prayer}
                      user_id={user_id}
                      onShowMemberProfile={onShowMemberProfile}
                      functions={functions}
                      mainProperties={this.props.properties}
                      section="explore"
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        <div id="loader"></div>
      </div>
    );
  }
}

export default Explore;
