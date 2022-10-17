import React, { Component, Fragment } from "react";
/* nav */
import Nav from "./components/nav/Nav";
/* home */
import Home from "./components/home/Home";
/* member profile */
import MemberProfile from "./components/memberProfile/MemberProfile";
/* donate */
import Donate from "./components/donate/Donate";
/* statistics */
import Statistics from "./components/statistics/Statistics";
/* explore */
import Explore from "./components/explore/Explore";
/* thees */
import Themes from "./components/themes/Themes";

/* privacy */
import Privacy from "./components/privacy/Privacy";
/* notifications */
import Notifications from "./components/notifications/Notifications";
/* bookmarks */
import Bookmarks from "./components/bookmarks/Bookmarks";
/* user requests */
import NewRequest from "./components/newRequest/NewRequest";
import UserRequests from "./components/userRequests/UserRequests";
import UserAnsweredRequests from "./components/userAnsweredRequests/UserAnsweredRequests";
import UserDeletedRequests from "./components/userDeletedRequests/UserDeletedRequests";
/* community requests */
import CommunityRequests from "./components/communityRequests/CommunityRequests";
import CommunityAnswers from "./components/communityAnswers/CommunityAnswers";
import NewPost from "./components/newPost/NewPost";
import UserPublishedPosts from "./components/userPublishedPosts/UserPublishedPosts";
import UserDeletedPosts from "./components/userDeletedPosts/UserDeletedPosts";
import EditUserInfo from "./components/editUserInfo/EditUserInfo";
import PopUpPost from "./components/popUpPost/PopUpPost";
import PopUpPrayer from "./components/popUpPrayer/PopUpPrayer";
import Bible from "./components/bible/Bible";
import Reports from "./components/reports/Reports";
import LogPage from "./components/login/LogPage";
import Members from "./components/members/Members";
import NotificationPopUp from "./components/notificationPopUp/NotificationPopUp";
import DeleteAccount from "./components/deleteAccount/DeleteAccount";
import Logout from "./components/logout/Logout";
const axiosFetch = require("./utils/axiosFetch");
require("dotenv").config();

const bodyScrollLock = require("body-scroll-lock");

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      accountSettings: null,
      currentSection: "general",
      currentlyDisplayed: "logpage",
      lastDisplayed: "home",
      nav: {
        isVisible: false,
      },
      communityMember: null,
      prayerInfo: null,
      memberId: null,
      post: null,
      theme: null,
      popUpPrayer: {
        prayer: null,
        isVisible: false,
      },
      popUpPost: {
        postId: null,
        isVisible: false,
      },
      shouldDisableScroll: true,
      requests: [],
      sectionBeforeRequestInfo: null, // ! an improvised variable to return from Request Info to the previous section
      hasNotification: false,
    };
  }

  handleLogOut = () => {
    const r = window.confirm("Are you sure you want to log out?");

    if (!r) return;

    this.setState({
      userInfo: {},
      accountSettings: null,
      currentSection: "general",
      currentlyDisplayed: "logpage",
      lastDisplayed: "home",
      nav: {
        isVisible: false,
      },
      communityMember: null,
      prayerInfo: null,
      memberId: null,
      post: null,
      theme: null,
      popUpPrayer: {
        prayer: null,
        isVisible: false,
      },
      popUpPost: {
        postId: null,
        isVisible: false,
      },
      shouldDisableScroll: true,
      requests: [],
      sectionBeforeRequestInfo: null, // ! an improvised variable to return from Request Info to the previous section
      hasNotification: false,
    });
  };

  handleUserLogIn = async (obj) => {
    obj = obj[0];
    obj.user_id = obj._id;

    // set user as community member to prefent breaking on profile open
    const url = `${process.env.REACT_APP_API_URL}/users/${obj._id}`;
    const communityMember = await axiosFetch.axiosGet({
      url,
      obj: { user_id: obj._id },
    });

    this.setState({
      userInfo: obj,
      userId: obj.user_id,
      currentlyDisplayed: "home",
      communityMember,
    });

    await this.fetchAccountSettings();
    await this.fetchChosenTheme(this.state.accountSettings.chosenTheme);
    this.renderTheme(this.state.theme);
  };

  fetchAccountSettings = async () => {
    const user_id = this.state.userInfo.user_id;
    const url = `${process.env.REACT_APP_API_URL}/settings/${user_id}`;

    const res = await axiosFetch.axiosGet({ url });
    const accountSettings = res[0];

    this.setState({ accountSettings });
  };

  /* ----- themes ----- */
  // fetch chosen theme
  fetchChosenTheme = async (chosenTheme) => {
    const url = `${process.env.REACT_APP_API_URL}/themes/${chosenTheme}`;
    const res = await axiosFetch.axiosGet({ url });
    const theme = res[0];

    this.setState({ theme });
    return theme;
  };

  renderTheme = (theme) => {
    for (const prop in theme) {
      document.documentElement.style.setProperty(`--${prop}`, theme[prop]);
    }
  };

  handleUpdateTheme = async (obj) => {
    this.setState({
      accountSettings: {
        ...this.state.accountSettings,
        chosenTheme: obj.themeName,
      },
    });

    const theme = await this.fetchChosenTheme(obj.themeName);
    this.renderTheme(theme);
  };

  // toggle sections
  handleGetSectionName = async (obj) => {
    const display = obj.name.replace(" ", "");
    const section = obj.section.replace(" ", "");
    const profile = display === "profile";

    /* ----- profile ----- */
    if (profile) await this.handleShowUserProfile();

    this.setState({ currentlyDisplayed: display, currentSection: section });
  };

  /*----- profile -----*/
  // show member profile
  handleShowMemberProfile = async (obj) => {
    const { user_id } = obj;

    this.setState({
      memberId: user_id,
      currentlyDisplayed: "",
    });

    const url = `${process.env.REACT_APP_API_URL}/users/${user_id}`;
    const communityMember = await axiosFetch.axiosGet({ url, obj });

    this.setState({
      communityMember,
      currentlyDisplayed: "memberprofile",
      popUpPost: {
        isVisible: false,
        postId: null,
      },
      popUpPrayer: {
        isVisible: false,
        prayer: null,
      },
    });
  };

  // hide member profile
  handleHideMemberProfile = () => {
    const { lastDisplayed } = this.state;

    let nextToBeDisplayed = lastDisplayed;
    let communityMember =
      lastDisplayed === "home" ? this.state.communityMember : null;

    // ! deleted doesn't have to be here because it works, but it was included in order to keep a pattern
    const possiblePreviousSections = [
      "requests",
      "answered",
      "deleted",
      "edituserinfo",
    ];

    if (possiblePreviousSections.includes(lastDisplayed))
      nextToBeDisplayed = "home";

    if (lastDisplayed === "profile" || lastDisplayed === "memberprofile") {
      nextToBeDisplayed = "home";
    }

    this.setState({
      currentlyDisplayed: nextToBeDisplayed,
      communityMember,
    });
  };

  // show user profile
  handleShowUserProfile = async () => {
    const userId = this.state.userId;
    const url = `${process.env.REACT_APP_API_URL}/users/${userId}`;
    const communityMember = await fetch(url).then((res) => res.json());

    this.setState({ communityMember });
  };

  /*----- new request -----*/
  handlePrayerInfo = (obj) => {
    const { prayer } = obj;

    this.setState({
      sectionBeforeRequestInfo: this.state.currentlyDisplayed,
      lastDisplayed: this.state.currentlyDisplayed,
      prayerInfo: prayer,
      currentlyDisplayed: "prayerinfo",
    });
  };

  handlePrayerInfoClose = () => {
    this.setState({
      currentlyDisplayed: this.state.sectionBeforeRequestInfo,
      lastDisplayed: "prayerinfo",
    });
  };

  /*----- post -----*/
  handleDisplayPost = (post_id) => {
    this.setState({ post: post_id });
  };

  handleDisplayPostFromBookmarks = (post_id, foo) => {
    this.setState({
      post: post_id,
      currentlyDisplayed: "post",
      lastDisplayed: "bookmarks",
    });
  };

  handleHidePost = () => {
    this.setState({ currentlyDisplayed: this.state.lastDisplayed });
  };

  handleShowUserEditSection = (obj) => {
    this.setState({
      currentlyDisplayed: "edituserinfo",
      lastDisplayed: "memberprofile",
    });
  };

  handleSectionToggle = (obj) => {
    const lastDisplayed = obj.from ? obj.from : this.state.currentlyDisplayed;
    const currentlyDisplayed = obj.to.replace(/ /gi, "");

    this.setState({
      lastDisplayed,
      currentlyDisplayed,
    });
  };

  handleShowNav = () => {
    const nav = { isVisible: true };
    this.setState({ nav });
  };

  // todo : this is preventing praying input from appearing in explore section
  handleHideNav = () => {
    const viewPort = window.innerWidth;
    const nav = { isVisible: false };
    this.setState({ nav });
  };

  handlePopUpPost = (obj) => {
    if (obj) {
      const isVisible = this.state.popUpPost.isVisible ? false : true;
      this.setState({
        popUpPost: { postId: obj ? obj.postId : null, isVisible },
      });

      isVisible
        ? bodyScrollLock.disableBodyScroll(document.body)
        : bodyScrollLock.enableBodyScroll(document.body);

      return;
    }

    this.setState({
      popUpPost: { postId: null, isVisible: false },
    });
    bodyScrollLock.enableBodyScroll(document.body);
  };

  handlePopUpPrayer = async (obj) => {
    await this.setState({
      popUpPrayer: { prayer: null, isVisible: false },
    });

    if (obj) {
      const isVisible = this.state.popUpPrayer.isVisible ? false : true;
      this.setState({
        popUpPrayer: { prayer: obj.prayer, isVisible },
      });
      isVisible
        ? bodyScrollLock.disableBodyScroll(document.body)
        : bodyScrollLock.enableBodyScroll(document.body);
      return;
    }

    this.setState({
      popUpPrayer: { prayer: null, isVisible: false },
    });
    bodyScrollLock.enableBodyScroll(document.body);
  };

  handleEnableBodyScroll = () => {
    const isVisible = true;
    this.setState({ popUpPrayer: { prayer: null, isVisible } });
    bodyScrollLock.enableBodyScroll(document.body);
  };

  handleRepostPostAbuse = async (elem) => {
    const { password } = this.state.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/abuse/post`;
    const obj = {
      user_id: elem.user_id,
      post_id: elem.id,
      password,
    };

    const res = await axiosFetch.axiosPost({ url, obj });
  };

  handleRepostRequestAbuse = async (elem) => {
    const { password } = this.state.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/abuse`;
    const obj = {
      user_id: elem.user_id,
      request_id: elem.id,
      password,
    };

    const res = await axiosFetch.axiosPost({ url, obj });
  };

  handleRepostPrayerAbuse = async (elem) => {
    const { user_id, password } = this.state.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/abuse/prayer`;
    const obj = {
      to_user: elem.to_user,
      from_user: elem.from_user,
      to_user: elem.to_user,
      prayer_id: elem.prayer_id,
      password,
      user_id,
    };

    const res = await axiosFetch.axiosPost({ url, obj });
  };

  handleLovePrayer = async (el) => {
    try {
      const { user_id, password } = this.state.userInfo;
      const url = `${process.env.REACT_APP_API_URL}/prayers/like`;
      const obj = {
        targetId: el._id,
        isLiked: el.isLiked,
        to_user: el.to_user,
        from_user: el.from_user,
        target: el.target,
        user_id,
        password,
      };

      const res = await axiosFetch.axiosPost({ url, obj });
    } catch (error) {
      console.log(error);
    }
  };

  handleLovePost = async (el) => {
    try {
      const { user_id, password } = this.state.userInfo;
      const url = `${process.env.REACT_APP_API_URL}/post/like`;
      const obj = {
        targetId: el._id,
        isLiked: el.isLiked ? false : true,
        from_user: this.state.userInfo.user_id,
        to_user: el.user_id,
        target: el.target,
        user_id,
        password,
      };

      const res = await axiosFetch.axiosPost({ url, obj });
    } catch (error) {
      console.log(error);
    }
  };

  handlePopNotification = (obj) => {
    setTimeout(() => {
      this.setState({ hasNotification: false });
    }, 3000);

    this.setState({ hasNotification: true });
  };

  handleUpdateUserInfo = (userInfo) => {
    this.setState({ userInfo });
  };

  // ! ------------------------
  // todo : delete before deplaying

  handleDeleteUser = () => {
    this.setState({
      userInfo: {},
      accountSettings: null,
      currentSection: "general",
      currentlyDisplayed: "logpage",
      lastDisplayed: "home",
      nav: {
        isVisible: false,
      },
      communityMember: null,
      prayerInfo: null,
      memberId: null,
      post: null,
      theme: null,
      popUpPrayer: {
        prayer: null,
        isVisible: false,
      },
      popUpPost: {
        postId: null,
        isVisible: false,
      },
      shouldDisableScroll: true,
      requests: [],
      sectionBeforeRequestInfo: null, // ! an improvised variable to return from Request Info to the previous section
      hasNotification: false,
    });
  };
  // ! ------------------------

  async componentDidMount() {
    //
  }

  render() {
    const display = this.state.currentlyDisplayed.toLowerCase();
    const section = this.state.currentSection.toLowerCase();

    const functions = {
      // section
      onUpdateUserInfo: this.handleUpdateUserInfo,
      onSectionToggle: this.handleSectionToggle,
      onGetSectionName: this.handleGetSectionName,
      // profile
      onShowMemberProfile: this.handleShowMemberProfile,
      onHideMemberProfile: this.handleHideMemberProfile,
      onShowUserEditSection: this.handleShowUserEditSection,
      // prayer
      onPrayerInfo: this.handlePrayerInfo,
      onPrayerInfoClose: this.handlePrayerInfoClose,
      // post
      onDisplayPost: this.handleDisplayPost,
      onDisplayPostFromBookmarks: this.handleDisplayPostFromBookmarks,
      onHidePost: this.handleHidePost,
      // theme
      onUpdateTheme: this.handleUpdateTheme,
      // login
      onUserLogIn: this.handleUserLogIn,
      // sign up
      // onSignUp: this.handleSignUp,
      // nav
      onHidenav: this.handleHideNav,
      // pop up
      onPopUpPost: this.handlePopUpPost,
      onPopUpPrayer: this.handlePopUpPrayer,
      // scroll
      onEnableBodyScroll: this.handleEnableBodyScroll,
      // report
      onRepostPostAbuse: this.handleRepostPostAbuse,
      onRepostRequestAbuse: this.handleRepostRequestAbuse,
      onRepostPrayerAbuse: this.handleRepostPrayerAbuse,
      // love
      onLovePrayer: this.handleLovePrayer,
      onLovePost: this.handleLovePost,
      onPopNotification: this.handlePopNotification,
      // ! -----------------
      // todo : delete before deplaying
      onLogOut: this.handleLogOut,
      onDeleteUser: this.handleDeleteUser,
      // ! -----------------
    };

    return (
      <Fragment>
        {display !== "logpage" && (
          <div
            id="nav-open"
            onClick={() => {
              this.handleShowNav();
            }}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
        )}

        {display !== "logpage" ? (
          <Nav properties={this.state} functions={functions} />
        ) : null}

        {display === "logpage" ? <LogPage functions={functions} /> : null}

        {display === "home" ? (
          <Home properties={this.state} functions={functions} />
        ) : null}

        {display === "notifications" ? (
          <Notifications properties={this.state} functions={functions} />
        ) : null}

        {display === "bookmarks" ? (
          <Bookmarks properties={this.state} functions={functions} />
        ) : null}

        {display === "profile" ? (
          <MemberProfile properties={this.state} functions={functions} />
        ) : null}

        {display === "memberprofile" ? (
          <MemberProfile properties={this.state} functions={functions} />
        ) : null}

        {display === "statistics" ? (
          <Statistics properties={this.state} functions={functions} />
        ) : null}

        {display === "explore" ? (
          <Explore properties={this.state} functions={functions} />
        ) : null}

        {display === "donate" ? (
          <Donate properties={this.state} functions={functions} />
        ) : null}

        {display === "newrequest" ? (
          <NewRequest properties={this.state} functions={functions} />
        ) : null}

        {display === "newpost" ? (
          <NewPost properties={this.state} functions={functions} />
        ) : null}

        {display === "requests" && section === "yourrequests" ? (
          <UserRequests properties={this.state} functions={functions} />
        ) : null}

        {display === "requests" && section === "communityrequests" ? (
          <CommunityRequests properties={this.state} functions={functions} />
        ) : null}

        {display === "answered" && section === "yourrequests" ? (
          <UserAnsweredRequests properties={this.state} functions={functions} />
        ) : null}

        {display === "answered" && section === "communityrequests" ? (
          <CommunityAnswers properties={this.state} functions={functions} />
        ) : null}

        {display === "deleted" ? (
          <UserDeletedRequests properties={this.state} functions={functions} />
        ) : null}

        {display === "bible" ? (
          <Bible properties={this.state} functions={functions} />
        ) : null}

        {display === "published" ? (
          <UserPublishedPosts properties={this.state} functions={functions} />
        ) : null}

        {display === "deletedposts" ? (
          <UserDeletedPosts properties={this.state} functions={functions} />
        ) : null}

        {display === "themes" ? (
          <Themes properties={this.state} functions={functions} />
        ) : null}

        {display === "privacy" ? (
          <Privacy properties={this.state} functions={functions} />
        ) : null}

        {display === "edituserinfo" ? (
          <EditUserInfo properties={this.state} functions={functions} />
        ) : null}

        {display !== "logpage" && this.state.popUpPost.isVisible && (
          <PopUpPost properties={this.state} functions={functions} />
        )}

        {display !== "logpage" && this.state.popUpPrayer.isVisible && (
          <PopUpPrayer properties={this.state} functions={functions} />
        )}

        {display === "reports" && (
          <Reports properties={this.state} functions={functions} />
        )}

        {display === "members" && (
          <Members properties={this.state} functions={functions} />
        )}

        {this.state.hasNotification && (
          <NotificationPopUp properties={this.state} functions={functions} />
        )}

        {/* ----------------- */}

        {display === "logout" && (
          <Logout properties={this.state} functions={functions} />
        )}

        {display === "deleteaccount" && (
          <DeleteAccount properties={this.state} functions={functions} />
        )}
        {/* ----------------- */}
      </Fragment>
    );
  }
}

export default App;
