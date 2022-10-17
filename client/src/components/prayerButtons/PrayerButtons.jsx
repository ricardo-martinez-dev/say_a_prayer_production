import "./style.css";
import React from "react";
import IconAbuse from "../iconAbuse/IconAbuse";
import IconPrayerAnswer from "../iconPrayerAnswer/IconPrayerAnswer";
import IconPrayerAnswerRestore from "../iconPrayerAnswerRestore/IconPrayerAnswerRestore";
import IconPrayerDelete from "../iconPrayerDelete/IconPrayerDelete";
import IconPrayerDeleteRestore from "../iconPrayerDeleteRestore/IconPrayerDeleteRestore";
import IconPrayerInfo from "../iconPrayerInfo/IconPrayerInfo";
import IconPrayerPray from "../iconPrayerPray/IconPrayerPray";

class PrayerButtons extends React.Component {
  render() {
    const { properties, functions } = this.props;

    return (
      <p className="buttons">
        {/* Info */}
        <IconPrayerInfo functions={functions} properties={properties} />

        {/* Pray */}
        <IconPrayerPray functions={functions} properties={properties} />

        {/* Delete */}
        <IconPrayerDelete functions={functions} properties={properties} />

        {/* Answer */}
        <IconPrayerAnswer functions={functions} properties={properties} />

        {/* Restore Answered */}
        <IconPrayerAnswerRestore
          functions={functions}
          properties={properties}
        />

        {/* Restore Deleted */}
        <IconPrayerDeleteRestore
          functions={functions}
          properties={properties}
        />

        {/* Report Abuse */}
        <IconAbuse functions={functions} properties={properties} />
      </p>
    );
  }
}

export default PrayerButtons;
