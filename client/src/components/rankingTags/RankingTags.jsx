import React from "react";

class RankingTags extends React.Component {
  state = {};
  render() {
    const { tags } = this.props;
    return (
      <div className="tags">
        <p>Top Tags</p>
        <ul>
          {tags.map((tag, i) => (
            <li key={i}>
              <span>#{tag.tag}</span> <span>{tag.counter}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RankingTags;
