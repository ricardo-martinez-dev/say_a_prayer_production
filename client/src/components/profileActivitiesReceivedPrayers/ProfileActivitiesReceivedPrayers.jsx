import axios, { Axios } from "axios";
import React from "react";
import Avatar from "../avatar/Avatar";
import IconPrayerInfo from "../iconPrayerInfo/IconPrayerInfo";
import Tags from "../tags/Tags";
require("dotenv").config();

class profileActivitiesReceivedPrayers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      request_id: null,
      from_user: null,
      to_user: null,
      prayer: null,
      tags: null,
      title: null,
      avatar: null,
      isLoading: true,
    };
  }

  fetchPrayer = async () => {
    const { _id, request_id, from_user, to_user, prayer } = this.props.req;

    this.setState({
      _id,
      request_id,
      from_user,
      to_user,
      prayer,
    });
  };

  getPrayerInfo = async () => {
    const { request_id } = this.state;
    const url = `${process.env.REACT_APP_API_URL}/requests/${request_id}`;

    const res = await axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    const { tags, title } = res;

    this.setState({ tags, title });
  };

  async componentDidMount() {
    await this.fetchPrayer();
    await this.getPrayerInfo();
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading) return null;
    const { functions } = this.props;

    const { _id, request_id, from_user, to_user, prayer, avatar, title, tags } =
      this.state;

    return (
      <div className="foo" key={_id}>
        <Avatar
          user_id={from_user}
          functions={functions}
          properties={this.props.properties}
        />

        <Tags tags={tags} />

        <div className="title">{title}</div>
        <div className="description">{prayer}</div>

        <p className="buttons">
          <IconPrayerInfo
            properties={{
              prayer: {
                _id: request_id,
                user_id: to_user,
              },
            }}
            functions={this.props.functions}
          />
        </p>
      </div>
    );
  }
}

export default profileActivitiesReceivedPrayers;
