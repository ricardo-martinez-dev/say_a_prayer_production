import React from "react";

class ProfileActivitiesHeader extends React.Component {
  render() {
    const { onSeeMore, onExpandActivities } = this.props.functions;
    const { src } = this.props.properties;
    const foo = src.split(" ");

    const res = foo
      .map((el) => el[0].toUpperCase() + el.substring(1))
      .join(" ");

    return (
      <h2>
        {res}
        <span
          className="more"
          onClick={() => {
            onSeeMore({ src });
            onExpandActivities();
          }}
        >
          <i className="fas fa-external-link-alt"></i>
        </span>
      </h2>
    );
  }
}

export default ProfileActivitiesHeader;
