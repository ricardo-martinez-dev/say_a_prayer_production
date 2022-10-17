import React from "react";

class NavList extends React.Component {
  render() {
    const { opt, elem, index, notifications, functions } = this.props;
    const {
      clearNotifications,
      onSectionToggle,
      onGetSectionName,
      onPopUpPost,
      onPopUpPrayer,
    } = this.props.functions;

    let notificationsStyle = {};
    let pulse = false;

    if (opt.txt === "notifications") {
      if (notifications) {
        notificationsStyle = "notifications-bright";
        pulse = true;
      } else notificationsStyle = "notifications-fade";
    }

    return (
      <li
        className={notificationsStyle}
        key={index}
        onClick={() => {
          const viewportWidth = window.innerWidth;

          if (viewportWidth < 1050) {
            functions.onHidenav();
          }

          clearNotifications(opt.txt);
          onGetSectionName({
            name: opt.txt,
            section: elem.section,
          });
          onSectionToggle({ to: opt.txt });

          onPopUpPost();
          onPopUpPrayer();
        }}
      >
        <span
          className={
            opt.txt === "donate"
              ? "icon pulsate"
              : (opt.txt === "notifications") & pulse
              ? "icon notifications"
              : "icon"
          }
        >
          <i className={opt.icon}></i>
        </span>
        <span>{opt.txt}</span>
      </li>
    );
  }
}

export default NavList;
