import axios from "axios";
import React from "react";
import ExplorePost from "../explorePost/ExplorePost";
import Spinner from "../spinner/Spinner";
require("dotenv").config();

class UserDeletedPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      user: null,
      isLoading: true,
    };
  }

  handleUpdatePostStatus = async (obj) => {
    const { posts } = this.state;
    const { user_id, password } = this.props.properties.userInfo;
    const { status, post_id } = obj;

    const res = posts.map((post) => {
      if (post._id === post_id) post.status = "published";
      return post;
    });

    this.setState({ posts: res });

    const url = `${process.env.REACT_APP_API_URL}/post/status`;
    const newObj = { status, post_id, user_id, password };

    const result = await axios
      .post(url, newObj)
      .then((res) => res.data)
      .catch((err) => () => {
        // TODO : fix catch error

        alert("Post could not be republished. Please, try again later!");

        const res = posts.map((post) => {
          if (post._id === post_id) post.status = "deleted";
          return post;
        });

        this.setState({ posts: res });
      });

    this.fetchUserPublishedPosts();
  };

  fetchUserPublishedPosts = async () => {
    const { user_id } = this.props.properties.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/post/deleted/${user_id}`;
    const posts = await axios(url)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    const { post, user } = posts;

    this.setState({ posts: post, user });
  };

  async componentDidMount() {
    await this.fetchUserPublishedPosts();
    this.setState({ isLoading: false });
  }

  render() {
    const { posts, isLoading } = this.state;
    const functions = {
      ...this.props.functions,
      handleUpdatePostStatus: this.handleUpdatePostStatus,
    };
    const { onShowMemberProfile, onDisplayPost } = this.props.functions;

    const gotPosts = !isLoading && posts.length > 0;

    return (
      <div
        id="publications"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>Your Deteled Posts</h2>

        {isLoading && <Spinner />}

        {!isLoading && !gotPosts && <p id="message">Nothing to display</p>}

        {gotPosts && (
          <div id="publications-holder">
            {posts.map((post) => {
              if (post.status !== "deleted") return;
              return (
                <ExplorePost
                  properties={post}
                  user_id={post.user_id}
                  onShowMemberProfile={onShowMemberProfile}
                  onDisplayPost={onDisplayPost}
                  functions={functions}
                  key={post._id}
                  mainProperties={this.props.properties}
                  section="deletedposts"
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default UserDeletedPosts;
