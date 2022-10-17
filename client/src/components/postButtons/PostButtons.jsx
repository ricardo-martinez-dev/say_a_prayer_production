import "./style.css";
import React from "react";
import IconPostDelete from "../iconPostDelete/IconPostDelete";
import IconPostReplubish from "../iconPostRepublish/IconPostReplubish";
import IconPostRead from "../iconPostRead/IconPostRead";

class PostButtons extends React.Component {
  render() {
    const { post_id, section } = this.props;
    const { functions } = this.props;
    const properties = { post_id, section };

    return (
      <p className="buttons">
        {/* read published post */}
        <IconPostRead
          functions={{
            onSectionToggle: functions.onSectionToggle,
            onDisplayPost: functions.onDisplayPost,
            onPopUpPost: functions.onPopUpPost,
          }}
          properties={{ id: post_id }}
        />

        {/* delete post */}
        <IconPostDelete functions={functions} properties={properties} />

        {/* republish post */}
        <IconPostReplubish functions={functions} properties={properties} />
      </p>
    );
  }
}

export default PostButtons;
