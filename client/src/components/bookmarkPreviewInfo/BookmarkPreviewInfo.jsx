import React from "react";
import "./style.css";
import DateComp from "../dateComp/DateComp";
import IconPrayerPray from "../iconPrayerPray/IconPrayerPray";
import IconPostRead from "../iconPostRead/IconPostRead";

// TODO : this component is the same as the Info component in Explore component

class BookmarkPreviewInfo extends React.Component {
  render() {
    const { date, id, user_id, status, onReportAbuse, onDisplayPost, isPost } =
      this.props;
    const { functions } = this.props;
    const { onSectionToggle, onPopUpPost } = this.props.functions;

    const properties = {
      ...this.props.post,
      post_id: id,
      section: "published",
    };

    // TODO : fetch post info
    const name = "juan mendez";

    return (
      <li id="foo">
        <div id="one">
          <span id="name">name: {name}</span>

          <DateComp date={date} />
        </div>
        <div id="two">
          {status === "answered" ? (
            <span
              id="celebrate"
              className="icons"
              onClick={() => alert("UHUU! I have been answered!!!")}
            >
              <i className="fas fa-grin-beam"></i>
            </span>
          ) : null}

          {/* pray icon */}
          {status !== "answered" && !isPost ? (
            <IconPrayerPray functions={functions} properties={properties} />
          ) : null}

          {/* read icon */}
          {isPost ? (
            <IconPostRead
              functions={{
                onSectionToggle,
                onDisplayPost,
                onPopUpPost,
              }}
              properties={{ id }}
            />
          ) : null}

          {/* report abuse */}
          <span>
            <span
              id="report"
              className="icons"
              onClick={() => {
                var r = window.confirm("Report this post as abusive?");
                if (r) {
                  this.props.functions.onRepostPostAbuse({
                    id,
                    user_id: this.props.properties.userInfo.user_id, // todo here
                  });

                  onReportAbuse();
                }
              }}
            >
              <i className="fas fa-exclamation-triangle"></i>
              <span className="tooltip">report abuse</span>
            </span>
          </span>
        </div>
      </li>
    );
  }
}

export default BookmarkPreviewInfo;
