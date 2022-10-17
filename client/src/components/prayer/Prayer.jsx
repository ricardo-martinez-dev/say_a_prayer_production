import "./style.css";
import React from "react";
import PrayerButtons from "../prayerButtons/PrayerButtons";
import PrayerInput from "../prayerInput/PrayerInput";
import Tags from "../tags/Tags";
import Avatar from "../avatar/Avatar";
import RequestTitle from "../requestTitle/RequestTitle";
import RequestBody from "../requestBody/RequestBody";

const axiosFetch = require("../../utils/axiosFetch");

require("dotenv").config();

class Prayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showInput: false,
      isAbuse: false,
      prayer: {
        request_id: null,
        from_user: null,
        to_user: null,
        prayer: null,
      },
    };
  }

  // send prayer
  handleSendPrayer = async (obj) => {
    const { prayer } = this.state.prayer;

    const isInvalidPrayer =
      !prayer || prayer.trim().length == 0 || prayer.trim().length > 100;

    if (isInvalidPrayer) {
      alert("Your prayer must be between 1 and 100 characters long!");
      return;
    }

    const urlOne = `${process.env.REACT_APP_API_URL}/prayers/new`;
    const urlTwo = `${process.env.REACT_APP_API_URL}/ranking/sent`;
    await this.updatePrayerAndRanking({
      urlOne,
      urlTwo,
      elem: this.state.prayer,
    });
    this.setState({ showInput: false });
  };

  updateRequest = async (obj) => {
    // ----------- DELETED CODE HERE ----------- //
    // ----------- DELETED CODE HERE ----------- //
    // ----------- DELETED CODE HERE ----------- //
  };

  updatePrayerAndRanking = async (obj) => {
    const { urlOne, urlTwo, elem } = obj;
    const res = await axiosFetch.axiosPost({ url: urlOne, obj: elem });

    await this.updateRanking({ url: urlTwo, elem: elem });
  };

  updateRanking = async (obj) => {
    // ----------- DELETED CODE HERE ----------- //
    // ----------- DELETED CODE HERE ----------- //
    // ----------- DELETED CODE HERE ----------- //
  };

  // delete request
  handleDelete = async (obj) => {
    const request = this.getObjectToBeUpdated({ status: "deleted", obj });
    this.updateRequest(request);
  };

  // set request as answered
  handleSetAsAnswered = async (obj) => {
    const request = this.getObjectToBeUpdated({ status: "answered", obj });
    this.updateRequest(request);
  };

  // restore request
  handleRestoreRequest = async (obj) => {
    const request = this.getObjectToBeUpdated({ status: "requested", obj });
    this.updateRequest(request);
  };

  getObjectToBeUpdated = (elem) => {
    const { status } = elem;
    return {
      status,
      url: status === "requested" ? "restore" : status,
      request_id: elem.obj._id,
      user_id: elem.obj.user_id,
      src: status === "requested" ? elem.obj.src : null,
    };
  };

  // report abuse
  handleReportAbuse = async (request_id) => {
    var r = window.confirm("Report this request as abusive?");
    if (r) {
      const { user_id } = this.props.properties.userInfo;

      const obj = {
        user_id,
        request_id,
      };

      this.setState({ isAbuse: true });

      const url = `${process.env.REACT_APP_API_URL}/abuse`;
      await axiosFetch.axiosPost({ url, obj });
    }
  };

  handlePrayerInput = (event) => {
    const { _id, user_id } = this.props.prayer;

    // ----------- DELETED CODE HERE ----------- //
    // ----------- DELETED CODE HERE ----------- //
    // ----------- DELETED CODE HERE ----------- //

    this.setState({
      prayer: {
        ...this.state.prayer,
        prayer: event.target.value,
        request_id: _id,
        from_user: userId,
        to_user: user_id,
      },
    });
  };

  handleInputDisplay = () => {
    const showInput = this.state.showInput ? false : true;
    this.setState({ showInput });
  };

  render() {
    if (!this.props.prayer) return null;

    const { showInput } = this.state;
    const { category, section, prayer } = this.props;
    let { user_id, pic, title, description, _id, tags } = this.props.prayer;
    const classes = this.state.isAbuse ? "hide" : "prayers";

    const functions = {
      ...this.props.functions,
      handleInputDisplay: this.handleInputDisplay,
      handleDelete: this.handleDelete,
      handleSetAsAnswered: this.handleSetAsAnswered,
      handleRestoreRequest: this.handleRestoreRequest,
      handleReportAbuse: this.handleReportAbuse,
      handlePrayerInput: this.handlePrayerInput,
      handleSendPrayer: this.handleSendPrayer,
    };

    const properties = {
      _id,
      user_id,
      showInput,
      prayer,
      section,
      category,
      user_id,
      pic,
    };

    return (
      <div className={classes}>
        <Avatar
          user_id={user_id}
          functions={functions}
          properties={this.props.properties}
        />
        <Tags tags={tags} />
        <RequestTitle title={title} />
        <RequestBody description={description} />
        <PrayerButtons functions={functions} properties={properties} />
        <PrayerInput functions={functions} properties={properties} />
      </div>
    );
  }
}

export default Prayer;
