import "./style.css";
import React from "react";
import ExploreRequest from "../exploreRequest/ExploreRequest";
import Tags from "../tags/Tags";
import Avatar from "../avatar/Avatar";
import BookmarkPreviewInfo from "../bookmarkPreviewInfo/BookmarkPreviewInfo";
import ElementName from "../elementName/ElementName";

class BookmarkPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isAbuse: false,
    };
  }

  // report abuse
  handleReportAbuse = async () => {
    this.setState({ isAbuse: true });
  };

  render() {
    const {
      _id,
      pic,
      tags,
      createdAt,
      title,
      description,
      status,
      user_id: foo,
    } = this.props.post;

    const { user_id } = this.props;
    const { isAbuse } = this.state;
    const { onDisplayPostFromBookmarks } = this.props.functions;
    const { functions, properties, post } = this.props;

    const elementDisplay = isAbuse ? "hide" : "show";

    const bar = description.replace(/<br\s*\/?>/gi, " ").slice(0, 150) + "...";

    return (
      <div className={`explore-prayer post ${elementDisplay}`} key={_id}>
        <ElementName properties={{ name: "post" }} />
        <Tags tags={tags} />
        <div id="info">
          <Avatar
            user_id={foo}
            functions={functions}
            properties={this.props.post}
          />

          <div id="user-info">
            <ul>
              <BookmarkPreviewInfo
                id={_id}
                user_id={user_id}
                date={createdAt}
                status={status}
                isPost={true}
                onReportAbuse={this.handleReportAbuse}
                onDisplayPost={onDisplayPostFromBookmarks}
                functions={functions}
                post={post}
                properties={this.props.properties}
              />
            </ul>
          </div>
        </div>

        <ExploreRequest prayer={title} isTitle={true} />
        <ExploreRequest prayer={bar} />
      </div>
    );
  }
}

export default BookmarkPreview;
