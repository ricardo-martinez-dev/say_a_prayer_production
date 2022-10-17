import "./style.css";
import React from "react";
import Avatar from "../avatar/Avatar";

class RankingComponent extends React.Component {
  render() {
    const { title, users, filter } = this.props;
    const { onSectionToggle, onShowMemberProfile } = this.props.functions;

    // sort result in descending order
    const result = users.sort((a, b) =>
      a[filter] > b[filter] ? -1 : b[filter] > a[filter] ? 1 : 0
    );

    return (
      <div className="ranking">
        <p id="ranking-title">{title}</p>
        <ul>
          {result.map((el) => {
            const isAvatar = el.pic.includes("avatar.jpg");
            const avatar = isAvatar ? "./gallery/avatars/avatar.jpg" : el.pic;

            return (
              <li key={el.user_id} userid={el.user_id}>
                <span
                  id="img"
                  onClick={async () => {
                    await onShowMemberProfile({ user_id: el.user_id });
                    onSectionToggle({ to: "member profile" });
                  }}
                >
                  <Avatar
                    user_id={el.user_id}
                    functions={this.props.functions}
                    properties={this.props.post}
                  />
                </span>
                <span
                  id="name"
                  onClick={async () => {
                    await onShowMemberProfile({ user_id: el.user_id });
                    onSectionToggle({ to: "member profile" });
                  }}
                >
                  {el.fname} {el.lname}
                </span>

                <span id="number">{el[filter] ? el[filter] : 0}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RankingComponent;
