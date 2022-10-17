import React from "react";
import Prayer from "../prayer/Prayer";
import Spinner from "../spinner/Spinner";

require("dotenv").config();

class communityAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requestedPrayers: [],
      page: 1,
      isLoading: true,
    };
  }

  /* ----- Lazy Load ----- */

  fetchData = async () => {
    const { userId } = this.props.properties;
    const { page } = this.state;

    const url = `${process.env.REACT_APP_API_URL}/requests/community/answered`;
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
    let requestedPrayers = await this.fetchData();
    requestedPrayers = this.state.requestedPrayers.concat(requestedPrayers);

    this.setState({ requestedPrayers });
  };

  // todo : DRY it! Same as in CommunityRequests.jsx
  /* ----- Lazy Load ----- */

  async componentDidMount() {
    await this.createElments();
    await this.lazyLoad();
    this.setState({ isLoading: false });
  }

  render() {
    const { requestedPrayers, isLoading } = this.state;
    const { properties } = this.props;
    const { currentSection } = properties;

    const functions = {
      ...this.props.functions,
      onLoadPrayers: this.handleLoadPrayers,
    };

    const gotRequests = !isLoading && requestedPrayers.length > 0;

    return (
      <div
        id="publications"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>Community's Answered Requests</h2>

        {isLoading && <Spinner />}

        {!gotRequests && <p id="message">Nothing to display</p>}

        {gotRequests && (
          <div id="publications-holder">
            {requestedPrayers.map((prayer) => (
              <Prayer
                key={
                  prayer._id + Math.floor(Math.random() * (1000000 - 100) + 100)
                }
                properties={properties}
                functions={functions}
                prayer={prayer}
                category="answered"
                section={currentSection}
              />
            ))}
          </div>
        )}

        <div id="loader"></div>
      </div>
    );
  }
}

export default communityAnswers;
