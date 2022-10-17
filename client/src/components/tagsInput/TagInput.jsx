import React from "react";
import RequiredMessage from "../requiredMessage/RequiredMessage";
import "./style.css";

class TagInput extends React.Component {
  render() {
    const { onTagsChange } = this.props;
    const { tags, tagsCount } = this.props.properties;

    const res = tags.length <= 3 ? tags : tags.slice(0, 3);
    const isRequired = <RequiredMessage input={tags} />;

    return (
      <React.Fragment>
        <p>
          Tags ( {tagsCount} ) {isRequired}
        </p>
        <input
          type="text"
          value={res.toString().replace(/,/g, " ")}
          onChange={onTagsChange}
          minLength="1"
          maxLength="30"
        />
      </React.Fragment>
    );
  }
}

export default TagInput;
