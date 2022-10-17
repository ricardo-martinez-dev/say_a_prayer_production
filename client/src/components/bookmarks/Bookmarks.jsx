import "./style.css";
import React from "react";
import BookmarkPreview from "../bookmarkPreview/BookmarkPreview";
import Spinner from "../spinner/Spinner";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isLoading: true,
    };
  }

  fetchBookmarks = async () => {
    const { user_id, password } = this.props.properties.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/bookmarks`;
    const obj = { user_id, password };
    const posts = await axiosFetch.axiosPost({ url, obj });

    this.setState({ posts });
  };

  async componentDidMount() {
    await this.fetchBookmarks();
    this.setState({ isLoading: false });
  }

  render() {
    const { posts } = this.state;
    const { functions, properties } = this.props;
    const { user_id } = this.props.properties.userInfo;

    return (
      <div
        id="bookmarks"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>Bookmarks</h2>

        <div id="explore-area">
          {this.state.isLoading ? (
            <Spinner />
          ) : posts.length > 0 ? (
            posts.map((post, i) => {
              const { abuse, _id } = post;
              if (abuse.includes(user_id)) return;
              if (post.status === "deleted") return;
              return (
                <BookmarkPreview post={post} functions={functions} key={i} />
              );
            })
          ) : (
            <p id="message">You don't have any bookmark</p>
          )}
        </div>
      </div>
    );
  }
}

export default Bookmarks;
