import "./style.css";
// import "../post/style.css";
import React from "react";
import Avatar from "../avatar/Avatar";
import DateComp from "../dateComp/DateComp";
import PostContent from "../postContent/PostContent";
import IconPostSave from "../iconPostSave/IconPostSave";
import Tooltip from "../tooltip/Tooltip";
import Spinner from "../spinner/Spinner";
import ButtonScrollTop from "../ButtonScrollTop/ButtonScrollTop";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class PopUpPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      isLoading: true,
      isSaved: null,
      avatar: null,
    };
  }

  checkPostBookmark = async () => {
    const { post } = this.state.post;
    const { user_id, password } = this.props.properties.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/bookmarks/saved`;
    const obj = {
      user_id,
      password,
      post_id: post._id,
    };
    const isSaved = await axiosFetch.axiosPost({ url, obj });

    this.setState({ isSaved });
  };

  // fetch post
  fetchPost = async () => {
    const postId = this.props.properties.popUpPost.postId;
    const userId = this.props.properties.userInfo.user_id;
    const url = `${process.env.REACT_APP_API_URL}/post/post/${postId}/${userId}`;

    const post = await axiosFetch.axiosGet({ url });

    this.setState({ post });
  };

  // bookmark post
  handlePostBookmark = async (elem) => {
    const isSaved = this.state.isSaved ? false : true;
    const { post_id } = elem;
    const { user_id, password } = this.props.properties.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/bookmarks/manage`;
    const obj = {
      user_id,
      post_id,
      password,
    };

    if (isSaved) await axiosFetch.axiosPost({ url, obj });
    else await axiosFetch.axiosDelete({ url, obj: { data: obj } });

    this.setState({ isSaved });
  };

  handleLike = () => {
    const isLiked = this.state.post.post.isLiked ? false : true;
    const updatedPost = { ...this.state.post.post, isLiked };
    const post = { ...this.state.post, post: updatedPost };

    this.setState({ post });
  };

  async componentDidMount() {
    await this.fetchPost();
    await this.checkPostBookmark();

    this.setState({ isLoading: false });
  }

  render() {
    const { onPopUpPost, onLovePost } = this.props.functions;
    const { isLoading } = this.state;
    const { isSaved } = !isLoading && this.state;
    const { post, user } = !isLoading && this.state.post;
    const { functions } = !isLoading && this.props;
    const content = !isLoading && post.description.split("<br/>");
    const save =
      !isLoading && isSaved
        ? { class: "remove", icon: "minus-circle" }
        : { class: "bookmark", icon: "bookmark" };

    return (
      <div id="popup-post" className="sectionComponent">
        <div id="post-popup-holder">
          {!this.state.isLoading ? (
            <div id="content">
              <div id="close" onClick={() => onPopUpPost()}>
                <i className="fas fa-times"></i>
                <Tooltip msg={"Close"} />
              </div>

              <h3 id="post-title">{post.title}</h3>

              <div id="info">
                <div id="user">
                  <Avatar
                    user_id={user.user_id}
                    functions={functions}
                    properties={this.props.properties}
                  />

                  <div id="info">
                    <span className="capitalize">
                      {user.fname} {user.lname}
                    </span>
                  </div>
                </div>
                <div id="post">
                  <div id="info">
                    <div id="foo">
                      <DateComp date={post.createdAt} />

                      <div id="icons">
                        <span id="bar">
                          <LovePost
                            functions={{ onLovePost, onLike: this.handleLike }}
                            properties={{ post }}
                          />

                          <Tooltip
                            msg={post.isLiked ? "retrieve love" : "send love"}
                          />
                        </span>

                        <IconPostSave
                          save={save}
                          user_id={user.user_id}
                          post_id={post._id}
                          onHandlePostBookmark={this.handlePostBookmark}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <PostContent content={content} />

              <ButtonScrollTop target="#post-popup-holder" />
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    );
  }
}

class LovePost extends React.Component {
  state = {};
  render() {
    const { onLike, onLovePost } = this.props.functions;
    const { post } = this.props.properties;

    return (
      <span
        id="like"
        onClick={() => {
          onLike();
          onLovePost({ ...post, target: "post" });
        }}
        style={{
          color: post.isLiked ? "red" : null,
        }}
      >
        <i className="fa-solid fa-heart"></i>
      </span>
    );
  }
}

export default PopUpPost;
