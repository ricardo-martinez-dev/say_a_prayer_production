import React from "react";
import Prayer from "../prayer/Prayer";
import Spinner from "../spinner/Spinner";

const axiosFetch = require("../../utils/axiosFetch");

require("dotenv").config();

class UserDeletedRequests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      requestedPrayers: [],
    };
  }

  handleLoadPrayers = async (el) => {
    const { requestedPrayers } = this.state;
    this.setState({
      requestedPrayers: requestedPrayers.filter((p) => p._id !== el),
    });
  };

  fetchUserDeletedRequests = async () => {
    const { user_id, password } = this.props.properties.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/requests/user/deleted`;
    const obj = {
      user_id,
      password,
    };
    const requestedPrayers = await axiosFetch.axiosPost({ url, obj });

    this.setState({ requestedPrayers, isLoading: false });
  };

  async componentDidMount() {
    await this.fetchUserDeletedRequests();
    this.setState({ isLoading: false });
  }

  render() {
    const { requestedPrayers, isLoading } = this.state;
    const { properties } = this.props;

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
        <h2>Your Deleted Requests</h2>

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
                category="deleted"
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default UserDeletedRequests;
