import React from "react";
import Info from "../exploreInfo/Info";
import Tags from "../tags/Tags";
import ExplorePrayerForm from "../explorePrayerForm/ExplorePrayerForm";
import ExploreRequest from "../exploreRequest/ExploreRequest";
import Avatar from "../avatar/Avatar";
import ElementName from "../elementName/ElementName";
require("dotenv").config();

class ExplorePrayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isAbuse: false,
    };
  }

  handleShowInput = (id) => {
    this.setState({ isEditing: true });
  };

  handleHideInput = () => {
    this.setState({ isEditing: false });
  };

  // report abuse
  // TODO : move to parent
  handleReportAbuseFoo = async () => {
    this.setState({ isAbuse: true });
  };

  render() {
    const {
      _id,
      pic,
      tags,
      createdAt,
      description,
      status,
      user_id: foo,
    } = this.props.properties;
    const { user_id } = this.props;
    const { isEditing, isAbuse } = this.state;
    const { functions } = this.props;
    const elementDisplay = isAbuse ? "hide" : "show";

    return (
      <div className={`explore-prayer ${elementDisplay}`} key={_id}>
        <ElementName properties={{ name: "request" }} />
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
                onPray={this.handleShowInput}
                onReportAbuseFoo={this.handleReportAbuseFoo}
                foo={foo}
                functions={functions}
              />
            </ul>
          </div>
        </div>

        {!isEditing ? (
          <ExploreRequest prayer={description} />
        ) : (
          <ExplorePrayerForm
            onHideInput={() => this.handleHideInput()}
            properties={this.props.properties}
            from_user={this.props.user_id}
          />
        )}
      </div>
    );
  }
}

export default ExplorePrayer;
