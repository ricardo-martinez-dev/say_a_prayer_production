import "./style.css";
import React from "react";
import PublishButton from "../publishButton/PublishButton";
import RequestInput from "../requestInput/RequestInput";
import TagInput from "../tagsInput/TagInput";
import TitleInput from "../titleInput/TitleInput";
const axios = require("axios");
require("dotenv").config();

class NewRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRequested: false,
      title: "",
      description: "",
      createdAt: "",
      tags: "",
      user_id: "",
      pic: "",
      tagsCount: 3,
    };
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleTagsChange = (e) => {
    const tags = e.target.value.replace(/,|\s/g, " ").split(" ");
    const filteredTags = tags.filter((el) => el !== "");
    const tagsCount = filteredTags.length <= 3 ? 3 - filteredTags.length : 0;

    this.setState({ tags, tagsCount });
  };

  displayForm = () => {
    this.setState({
      isRequested: false,
      title: "",
      description: "",
      createdAt: "",
      tags: "",
      user_id: "",
      pic: "",
    });
  };

  getTimeStamp = async () => {
    return Date.now();
  };

  handeNewRequest = async (e) => {
    e.preventDefault();

    const { pic, user_id, password } = this.props.properties.userInfo;
    const { title, description, tags } = this.state;

    // todo : validate in the backend
    const edittedContent = description.replace(/(\r\n|\n\r|\r|\n)/g, "<br/>");
    const prayerTags = tags.slice(0, 3);
    const prayerTitle = title.slice(0, 100);
    const isInvalidTitle = !prayerTitle || prayerTitle.trim().length == 0; // todo : validate min and max length
    const isInvalidDescription =
      !edittedContent || edittedContent.trim().length == 0; // todo : validate min and max length
    const isInvalidTag = prayerTags.length == 0 || prayerTags[0] == ""; // todo : validate min and max length

    if (isInvalidTitle || isInvalidDescription || isInvalidTag) {
      alert("No empty field is allowed!");
      return;
    }

    const createdAt = await this.getTimeStamp();
    this.setState({ createdAt, isRequested: true, pic, user_id });

    const request = {
      title,
      description,
      user_id,
      tags,
      pic,
      createdAt,
      password,
    };

    const requestUrl = `${process.env.REACT_APP_API_URL}/requests`;
    await axios
      .post(requestUrl, request)
      .then((res) => res.data)
      .catch(function (err) {
        console.log(err.message);
      });

    const rankingUrl = `${process.env.REACT_APP_API_URL}/ranking/request`;
    await axios
      .post(rankingUrl, request)
      .then((res) => res.data)
      .catch(function (err) {
        console.log(err.message);
      });
  };

  requestForm = () => {
    return (
      <form>
        <TitleInput
          properties={this.state}
          onInputChange={this.handleTitleChange}
          target="prayer"
        />

        <RequestInput
          properties={this.state}
          onInputChange={this.handleDescriptionChange}
        />

        {/* // TODO : make sure it count propertly. Sanitize it in server */}
        <TagInput
          properties={this.state}
          onTagsChange={this.handleTagsChange}
        />

        <PublishButton btn={"Send"} onNewRequest={this.handeNewRequest} />
      </form>
    );
  };

  newRequest = () => {
    return (
      <div
        id="new-request-message"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h3>Thank you!</h3>
        <p id="new-req-thanks">Your request has been sent.</p>

        <button onClick={this.displayForm}>
          <i className="fas fa-praying-hands"></i>
          <span>New Request</span>
          <i className="fas fa-praying-hands"></i>
        </button>
      </div>
    );
  };

  render() {
    return (
      <div id="new-request" className="sectionComponent">
        <h2>New Request</h2>

        <div id="content">
          {this.state.isRequested === false
            ? this.requestForm()
            : this.newRequest()}
        </div>
      </div>
    );
  }
}

export default NewRequest;
