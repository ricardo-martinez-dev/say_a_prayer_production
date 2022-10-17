import "./style.css";
import axios from "axios";
import React from "react";
import Avatar from "../avatar/Avatar";
import Tooltip from "../tooltip/Tooltip";
import Spinner from "../spinner/Spinner";
require("dotenv").config();

class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      isLoading: true,
    };
  }

  handleRemoveAbuse = async (obj) => {
    const url = `${process.env.REACT_APP_API_URL}/reports`;

    const reports = this.state.reports.filter((el) => el._id !== obj.target_id);

    this.setState({ reports });

    await axios
      .post(url, obj)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        alert("Oops! Something went wrong.");
      });
  };

  fetchReports = async () => {
    const { user_id } = this.props.properties.userInfo;

    const url = `${process.env.REACT_APP_API_URL}/reports/${user_id}`;
    const reports = await axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    this.setState({ reports });
  };

  async componentDidMount() {
    await this.fetchReports();
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading, reports } = this.state;
    const gotRequests = !isLoading && reports.length > 0;

    return (
      <div
        id="reports"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>Reports</h2>

        {isLoading && <Spinner />}

        {!isLoading && !gotRequests && <p id="message">Nothing to display</p>}

        {!isLoading && gotRequests && (
          <div id="reports-holder">
            <ul>
              {reports.map((report) => {
                return (
                  <li key={report._id}>
                    <p id="header">{report.target}</p>
                    <div id="top">
                      <Avatar
                        user_id={report.user_id}
                        functions={this.props.functions}
                      />

                      <div id="report-info">
                        <ul id="report-info-ul">
                          <li>Ricardo Martinez</li>
                          <li>
                            {new Date(report.date)
                              .toUTCString()
                              .substring(0, 25)}
                          </li>
                        </ul>
                      </div>

                      <div id="icons">
                        <p>
                          <span>
                            <span
                              onClick={() => {
                                this.handleRemoveAbuse({
                                  target_id: report._id,
                                  target: report.target,
                                  user_id:
                                    report.target === "prayer" ||
                                    report.target === "post" ||
                                    report.target === "request"
                                      ? this.props.properties.userInfo.user_id
                                      : report.user_id,
                                });
                              }}
                            >
                              <i
                                className="fas fa-exclamation-triangle"
                                id="remove-report"
                              ></i>
                            </span>

                            {this.props.children ? (
                              this.props.children
                            ) : (
                              <Tooltip msg="delete report" />
                            )}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div id="bottom">
                      <h3>{report.title}</h3>
                      <p>{report.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Reports;
