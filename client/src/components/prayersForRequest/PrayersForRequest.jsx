import "./style.css";
import React from "react";
import { getDate } from "../../utils/date";
import Avatar from "../avatar/Avatar";

const axiosFetch = require("../../utils/axiosFetch");

require("dotenv").config();

class PrayersForRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: null,
      fname: null,
      lname: null,
    };
  }

  getUserName = async () => {
    const { from_user } = this.props.properties;
    const url = `${process.env.REACT_APP_API_URL}/users/${from_user}`;
    const res = await axiosFetch.axiosGet({ url });

    this.setState({ fname: res.fname, lname: res.lname });
  };

  async componentDidMount() {
    this.getUserName();
  }

  render() {
    const { properties, users } = this.props;
    const { prayer, date } = properties;
    const { functions } = this.props;
    const createdAt = new Date(date);
    const { day, month, year } = getDate(createdAt);

    return (
      <div className="received-prayers">
        <div id="user">
          <Avatar
            user_id={this.props.properties.from_user}
            functions={functions}
            properties={this.props.properties}
          />

          <div id="user-info">
            <ul>
              <li>
                <span>by :</span>
                <span>
                  {this.state.fname} {this.state.lname}
                </span>
              </li>
              <li>
                <span>on :</span>
                <span>
                  {day} {month} {year}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div id="prayer">{prayer}</div>
      </div>
    );
  }
}

export default PrayersForRequest;
