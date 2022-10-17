import "./style.css";
import React from "react";
import Spinner from "../spinner/Spinner";
import ChangeMemberPic from "../changeMemberPic/ChangeMemberPic";
import Avatar from "../avatar/Avatar";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class MemberBasicInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      privacy: null,
      isLoading: true,
      avatar: null,
    };
  }

  getAge = (dateString) => {
    let formattedDate = dateString.split(".");
    formattedDate = `${formattedDate[2]}/${formattedDate[1]}/${formattedDate[0]}`;
    // code src: https://jsfiddle.net/w2xny8ht/2/
    let today = new Date();
    let birthDate = new Date(formattedDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age.toString().toLowerCase() === "nan") return "*****";
    else return age;
  };

  fetchAccountSettings = async () => {
    const user_id = this.props.properties.communityMember._id;
    const url = `${process.env.REACT_APP_API_URL}/settings/${user_id}`;

    const res = await axiosFetch.axiosGet({ url });
    const privacy = res[0].privacy;

    this.setState({ privacy });
  };

  async componentDidMount() {
    this.setState({
      privacy: {},
      isLoading: false,
      avatar: null,
    });

    await this.fetchAccountSettings();
    this.setState({ isLoading: false });
  }

  render() {
    // TODO : add option to change profile picture

    if (this.state.isLoading) return null;

    const { fname, lname, bday, religion, denomination, pic, sponsorship } =
      this.props.member;
    const user_id = this.props.properties.communityMember._id;
    const { isSponsor } = sponsorship;
    const { ownership } = this.props;
    const { functions } = this.props;
    const { onSectionToggle } = this.props.functions;

    return (
      <React.Fragment>
        {this.state.privacy ? (
          <div id="basic-info">
            <div id="user-pic">
              {ownership.toLowerCase() === "member" && (
                <Avatar
                  user_id={user_id}
                  functions={functions}
                  properties={this.props.properties}
                />
              )}

              {ownership.toLowerCase() === "your" && (
                <ChangeMemberPic
                  functions={this.props.functions}
                  properties={this.props.properties}
                />
              )}
            </div>

            <div id="user-data">
              <ul>
                {isSponsor && this.state.privacy.showSponsorship ? (
                  <li>
                    sponsor:{" "}
                    <span id="sponsor">
                      <i className="fas fa-heart icon"></i>
                      <i className="fas fa-heart icon"></i>
                      <i className="fas fa-heart icon"></i>
                    </span>
                  </li>
                ) : null}
                <li>
                  name:{" "}
                  <span id="user-name">
                    {fname} {lname}
                  </span>
                  {/*  */}
                  <span id="edit-user-info">
                    <span
                      onClick={() => {
                        onSectionToggle({ to: "edituserinfo" });
                      }}
                    >
                      {ownership.toLowerCase() === "your" ? (
                        <i className="fas fa-edit" id="edit-info"></i>
                      ) : null}
                    </span>
                    <span className="tooltip">edit info</span>
                  </span>
                  {/*  */}
                </li>
                <li>
                  age:{" "}
                  {this.state.privacy.showAge ? this.getAge(bday) : "*****"}
                </li>
                <li>
                  religion:{" "}
                  {this.state.privacy.showReligion ? religion : "*****"}
                </li>
                <li>
                  denomination:{" "}
                  {this.state.privacy.showDenomination ? denomination : "*****"}
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </React.Fragment>
    );
  }
}

export default MemberBasicInfo;
