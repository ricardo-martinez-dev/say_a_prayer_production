import "./style.css";
import React from "react";
import TagInput from "../tagsInput/TagInput";
import TitleInput from "../titleInput/TitleInput";
import PostContentInput from "../postContentInput/PostContentInput";
import PublishButton from "../publishButton/PublishButton";
const axios = require("axios");
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSponsor: true,
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

  async componentDidMount() {
    const user_id = this.props.properties.userInfo.user_id;
    const url = `${process.env.REACT_APP_API_URL}/membership/${user_id}`;
    const isSponsor = await axiosFetch.axiosGet({ url });

    this.setState({ isSponsor });
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState({ description });
  };

  handleTagsChange = (e) => {
    const tags = e.target.value.replace(/,|\s/g, " ").split(" ");
    const filteredTags = tags.filter((el) => el !== "");
    const tagsCount = filteredTags.length < 3 ? 3 - filteredTags.length : 0;

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

    const createdAt = await this.getTimeStamp();
    this.setState({ createdAt, pic, user_id });

    const edittedContent = description.replace(/(\r\n|\n\r|\r|\n)/g, "<br/>");
    const postTags = tags.slice(0, 3);
    const postTitle = title.slice(0, 100);

    const isInvalidTitle = !postTitle || postTitle.trim().length == 0; // todo : validate min and max length
    const isInvalidDescription =
      !edittedContent || edittedContent.trim().length == 0; // todo : validate min and max length
    const isInvalidTag = postTags.length == 0 || postTags[0] == ""; // todo : validate min and max length

    if (isInvalidTitle || isInvalidDescription || isInvalidTag) {
      alert("No empty field is allowed!");
      return;
    }

    const request = {
      title: postTitle,
      description: edittedContent,
      user_id,
      tags: postTags,
      createdAt,
      pic,
      password,
    };

    const url = `${process.env.REACT_APP_API_URL}/post/post`;
    const res = await axios
      .post(url, request)
      .then((res) => res.data)
      .catch((err) => console.log(err.message));

    if (res.toLowerCase() === "success") this.setState({ isRequested: true });
  };

  notAllowedComponent = () => {
    return (
      <div id="not-allowed">
        <p className="non-premium" id="non-premium-header">
          Would you like to create that amazing post?
        </p>
        <p className="non-premium">
          Then help us reach more people by becoming one of our sponsors!
        </p>

        <button className="donate" onClick={() => this.handleDonate()}>
          Become a Sponsor
        </button>
      </div>
    );
  };

  requestFormComponent = () => {
    return (
      <form>
        <TitleInput
          properties={this.state}
          onInputChange={this.handleTitleChange}
          target="post"
        />

        <PostContentInput
          properties={this.state}
          onInputChange={this.handleDescriptionChange}
        />

        {/* // TODO : make sure it count propertly */}

        <TagInput
          properties={this.state}
          onTagsChange={this.handleTagsChange}
        />

        <PublishButton btn={"Publish"} onNewRequest={this.handeNewRequest} />
      </form>
    );
  };

  newRequestComponent = () => {
    return (
      <div id="new-request-message">
        <h3>Thank you!</h3>
        <p id="new-post-thanks">Your post has been published.</p>

        <button onClick={this.displayForm}>
          <i className="fas fa-praying-hands"></i>
          <span>New Post</span>
          <i className="fas fa-praying-hands"></i>
        </button>
      </div>
    );
  };

  render() {
    const { isRequested, isSponsor } = this.state;

    return (
      <div
        id="new-post"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>New Post</h2>

        <div id="content">
          {/* not sponsor */}
          {!isSponsor && this.notAllowedComponent()}

          {/* sponsor */}
          {isSponsor && isRequested && this.newRequestComponent()}
          {isSponsor && !isRequested && this.requestFormComponent()}
        </div>
      </div>
    );
  }
}

export default NewPost;
