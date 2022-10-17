import "./style.css";
import React from "react";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class MemberStatistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statistics: {
        answered: 0,
        deleted: 0,
        received: 0,
        requests: 0,
        sent: 0,
      },
      isLoding: true,
    };
  }

  fetchStats = async () => {
    const user_id = this.props.member._id;
    const url = `${process.env.REACT_APP_API_URL}/statistics/member/${user_id}`;
    const res = await axiosFetch.axiosGet({ url });
    const statistics = res ? res : this.state.statistics;

    this.setState({ statistics, isLoding: false });
  };

  async componentDidMount() {
    this.fetchStats();
  }

  render() {
    if (this.state.isLoding) return null;

    const { requests, received, sent, answered } = this.state.statistics;

    return (
      <div id="member-statistics">
        <ul>
          <li>
            <span className="icon">
              <i className="fas fa-pray"></i>
            </span>
            <span className="foo">requests :</span>
            <span>{requests ? requests : 0}</span>
          </li>
          <li>
            <span className="icon">
              <i className="fas fa-praying-hands"></i>
            </span>
            <span className="foo">received prayers:</span>
            <span>{received ? received : 0}</span>
          </li>
          <li>
            <span className="icon">
              <i className="fas fa-child"></i>
            </span>
            <span className="foo">answered prayers:</span>
            <span>{answered ? answered : 0}</span>
          </li>
          <li>
            <span className="icon">
              <i className="fas fa-child"></i>
            </span>
            <span className="foo">sent prayers:</span>
            <span>{sent ? sent : 0}</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default MemberStatistics;
