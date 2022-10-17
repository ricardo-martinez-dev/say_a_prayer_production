import React from "react";
import Avatar from "../avatar/Avatar";
import IconPrayerInfo from "../iconPrayerInfo/IconPrayerInfo";
import IconPostRead from "../iconPostRead/IconPostRead";
require("dotenv").config();

class ProfileActivitiesRequests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: null,
    };
  }

  render() {
    const { functions, target } = this.props;
    const { req } = this.props;

    return (
      <div className="foo" key={req._id}>
        <Avatar
          user_id={req.user_id}
          functions={functions}
          properties={this.props.properties}
        />

        <div id="tags">
          {req.tags.map((tag, i) => (
            <span className="tag" key={i}>
              #{tag}
            </span>
          ))}
        </div>

        <div className="title">{req.title}</div>
        <div className="description">{req.description}</div>

        <p className="buttons">
          {req.isPost ? (
            <span>
              <IconPostRead
                functions={{
                  onSectionToggle: functions.onSectionToggle,
                  onDisplayPost: functions.onDisplayPost,
                  onPopUpPost: functions.onPopUpPost,
                }}
                properties={{ id: req._id }}
              />
            </span>
          ) : (
            <span>
              <IconPrayerInfo
                functions={functions}
                properties={{ showInput: false, prayer: req }}
              />
            </span>
          )}
        </p>
      </div>
    );
  }
}

export default ProfileActivitiesRequests;
