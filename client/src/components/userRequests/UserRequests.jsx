import React from "react";
import Prayer from "../prayer/Prayer";
import Spinner from "../spinner/Spinner";

const axiosFetch = require("../../utils/axiosFetch");

require("dotenv").config();

class UserRequests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: 0,
      requestedPrayers: [],
      isLoading: true,
    };
  }

  handleLoadPrayers = async (el) => {
    const { requestedPrayers } = this.state;
    this.setState({
      requestedPrayers: requestedPrayers.filter((p) => p._id !== el),
    });
  };

  fetchUserRequests = async () => {
    const { user_id, password } = this.props.properties.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/requests/user/requested`;
    const obj = {
      user_id,
      password,
    };
    const requestedPrayers = await axiosFetch.axiosPost({ url, obj });

    this.setState({ requestedPrayers });
  };

  async componentDidMount() {
    await this.fetchUserRequests();
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
        <h2>Your Requests</h2>

        {isLoading && <Spinner />}

        {!isLoading && !gotRequests && <p id="message">Nothing to display</p>}

        {gotRequests && (
          <div id="publications-holder">
            {requestedPrayers.map((prayer) => (
              <Prayer
                key={prayer._id}
                properties={properties}
                functions={functions}
                prayer={prayer}
                category="requested"
                section={currentSection}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default UserRequests;
