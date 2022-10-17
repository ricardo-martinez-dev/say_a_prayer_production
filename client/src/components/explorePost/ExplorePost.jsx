import "./style.css";
import React from "react";
import ExploreRequest from "../exploreRequest/ExploreRequest";
import Info from "../exploreInfo/Info";
import Tags from "../tags/Tags";
import Avatar from "../avatar/Avatar";
import ElementName from "../elementName/ElementName";

class ExplorePost extends React.Component {
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
    const { user_id, onDisplayPost } = this.props;
    const { isAbuse } = this.state;

    const {
      _id,
      tags,
      createdAt,
      title,
      description,
      status,
      user_id: foo,
    } = this.props.properties;

    const functions = {
      ...this.props.functions,
      onReportAbuse: this.handleReportAbuse,
    };

    const elementDisplay = isAbuse ? "hide" : "show";
    const bar = description.replace(/<br\s*\/?>/gi, " ").slice(0, 150) + "...";

    return (
      <div className={`explore-prayer post ${elementDisplay}`}>
        <ElementName properties={{ name: "post" }} />
        <Tags tags={tags} />
        <div id="info">
          <Avatar
            functions={functions}
            user_id={foo}
            properties={this.props.properties}
          />

          <div id="user-info">
            <ul>
              <Info
                id={_id}
                user_id={user_id}
                date={createdAt}
                status={status}
                isPost={true}
                foo={foo}
                onDisplayPost={onDisplayPost}
                functions={functions}
                mainProperties={this.props}
                section={this.props.section}
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

export default ExplorePost;
