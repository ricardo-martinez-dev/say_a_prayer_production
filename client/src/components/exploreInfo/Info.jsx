import "./style.css";
import React from "react";
import DateComp from "../dateComp/DateComp";
import Tooltip from "../tooltip/Tooltip";
import IconPostRead from "../iconPostRead/IconPostRead";
import IconPostDelete from "../iconPostDelete/IconPostDelete";
import IconPostReplubish from "../iconPostRepublish/IconPostReplubish";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

// TODO : this component is the same as the Info component in Foo component
class Info extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        fname: null,
        lname: null,
      },
      isLoading: true,
    };
  }

  fetchUserInfo = async () => {
    const { foo } = this.props;
    const url = `${process.env.REACT_APP_API_URL}/users/${foo}`;

    const res = await axiosFetch.axiosGet({ url });

    const { fname, lname } = res;
    this.setState({ user: { fname, lname } });
  };

  async componentDidMount() {
    this.fetchUserInfo();
  }

  render() {
    const { fname, lname } = this.state.user;
    const { date, id, user_id, status, onPray, isPost, onReportAbuseFoo } =
      this.props;
    const { onReportAbuse } = this.props.functions;
    const { functions } = this.props;
    let section = this.props.section ? this.props.section : "";

    return (
      <li id="foo">
        <div id="one">
          <span id="name">
            {fname} {lname}
          </span>
          <DateComp date={date} />
        </div>
        <div id="two">
          {/* celebrate icon */}
          {status === "answered" && (
            <span
              id="celebrate"
              className="icons"
              onClick={() => alert("UHUU! I have been answered!!!")}
            >
              <i className="fas fa-grin-beam"></i>
            </span>
          )}

          {/* pray icon */}
          {status !== "answered" && !isPost && (
            <span>
              <span id="pray" className="icons" onClick={() => onPray(id)}>
                <i className="fas fa-praying-hands"></i>
                <Tooltip msg="pray" />
              </span>
            </span>
          )}

          {/* read icon */}
          {isPost && (
            <span>
              <IconPostRead
                functions={{
                  onSectionToggle: functions.onSectionToggle,
                  onDisplayPost: functions.onDisplayPost,
                  onPopUpPost: functions.onPopUpPost,
                }}
                properties={{ id: id }}
              />
            </span>
          )}

          {isPost && status === "published" && section === "published" && (
            <span>
              <IconPostDelete
                properties={{ post_id: id, section: "published" }}
                functions={functions}
              />
            </span>
          )}

          {isPost && status === "deleted" && section === "deletedposts" && (
            <span>
              <IconPostReplubish
                properties={{ post_id: id, section: "deleted" }}
                functions={functions}
              />
            </span>
          )}

          {section !== "deletedposts" && section !== "published" && isPost && (
            <span>
              <span
                id="report"
                className="icons"
                onClick={() => {
                  var r = window.confirm("Report this post as abusive?");
                  if (r) {
                    this.props.functions.onRepostPostAbuse({ id, user_id });
                    onReportAbuse();
                  }
                }}
              >
                <i className="fas fa-exclamation-triangle"></i>
                <Tooltip msg="report abuse" />
              </span>
            </span>
          )}

          {/* // todo : report prayer */}
          {section !== "deletedposts" && section !== "published" && !isPost && (
            <span>
              <span
                id="report"
                className="icons"
                onClick={() => {
                  var r = window.confirm("Report this request as abusive?");

                  if (r) {
                    this.props.functions.onRepostRequestAbuse({ id, user_id });
                    onReportAbuseFoo();
                  }
                }}
              >
                <i className="fas fa-exclamation-triangle"></i>
                <Tooltip msg="report abuse" />
              </span>
            </span>
          )}
        </div>
      </li>
    );
  }
}

export default Info;
