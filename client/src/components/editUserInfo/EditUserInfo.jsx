import React from "react";
import "./style.css";
require("dotenv").config();

const axiosFetch = require("../../utils/axiosFetch");

class EditUserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: "",
      fname: "",
      lname: "",
      bday: "",
      religion: "",
      denomination: "",
      city: "",
      country: "",
      languages: "",
      password: "",
    };
  }

  async componentDidMount() {
    // TODO : fetch user info
    await this.getUserInfo();
  }

  getUserInfo = async () => {
    const url = `${process.env.REACT_APP_API_URL}/users`;
    const obj = {
      user_id: this.props.properties.userInfo.user_id,
      password: this.props.properties.userInfo.password,
    };

    const res = await axiosFetch.axiosPost({ url, obj });

    const {
      _id: user_id,
      fname,
      lname,
      bday,
      religion,
      denomination,
      city,
      country,
      languages,
      password,
    } = res;

    // format date
    const newDate = bday.split("-");
    const day = newDate[1];
    const month = newDate[0];
    const year = newDate[2];

    this.setState({
      user_id,
      fname,
      lname,
      bday: `${month}-${day}-${year}`,
      religion,
      denomination,
      city,
      country,
      languages,
      password,
    });
  };

  // TODO USER THIS FUNCTION IN OTHER COMPONENTS TO HANDLE CHANGES
  handleChange = (evt) => {
    this.setState({
      ...this.state,
      [evt.target.name]: evt.target.value,
    });
  };

  getMaxDate = () => {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1; //January is 0!
    let year = today.getFullYear() - 18;

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    return `${year}-${month}-${day}`;
  };

  checkFields = () => {
    let errors = null;

    for (const [key, value] of Object.entries(this.state)) {
      if (key === "languages") continue; // todo : include languages
      const re = /^[a-z0-9\s]/i;
      const isValidInput = re.test(value) ? true : false;

      if (!isValidInput) errors = key;
    }

    return !errors ? true : false;
  };

  checkPasswordChangePermision = () => {
    // ----------- DELETED CODE HERE ----------- //
    // ----------- DELETED CODE HERE ----------- //
    // ----------- DELETED CODE HERE ----------- //
    let res = true;

    if (this.state.user_id === userId && this.state.password !== userPass) {
      alert(
        `You can not change this user's password because it's only for testing purpose!`
      );
      this.setState({ password: userPass });
      res = false;
    }

    return res;
  };

  handleUpdateUserInfo = async () => {
    const isSuccess = this.checkFields();

    // check if password change is allowed
    const isPasswordChangeAllowed = this.checkPasswordChangePermision();
    if (!isPasswordChangeAllowed) return;

    if (!isSuccess) {
      alert(
        "Make sure you update every field before saving.\nUpdate your privacy settings if you don't want to display your information."
      );
      return;
    }

    // update user info
    const res = window.confirm("Are you sure you want to save the changes?");
    const { password } = this.props.properties.userInfo;

    if (res) {
      const obj = { update: this.state, password };
      const url = `${process.env.REACT_APP_API_URL}/post/user/settings/update`;
      const res = await axiosFetch.axiosPost({ url, obj });

      console.log(res);

      if (res.status === "success") {
        this.props.functions.onUpdateUserInfo(res.result);
        this.props.functions.onSectionToggle({ to: "member profile" });
      } else alert("Ops! Could not update user info. Please, try again later!");
    }
  };

  render() {
    // TODO : create languages input

    const { onSectionToggle } = this.props.functions;
    const {
      fname,
      lname,
      bday,
      religion,
      denomination,
      city,
      country,
      languages,
      password,
      user_id,
    } = this.state;

    const isRecruter = user_id === "62c87954db8aa92094e6c7b1";

    return (
      <div
        id="edit-user-info"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>Edit User Info</h2>

        <div id="edit-user-holder">
          <div id="user-info">
            <form onSubmit={(event) => event.preventDefault()}>
              <p className="edit-info">first name</p>
              <input
                type="text"
                name="fname"
                value={fname}
                minLength="1"
                maxLength="20"
                onChange={(ev) => this.handleChange(ev)}
              />

              <p className="edit-info">last name</p>
              <input
                type="text"
                name="lname"
                value={lname}
                minLength="1"
                maxLength="20"
                onChange={(ev) => this.handleChange(ev)}
              />

              <p className="edit-info">
                password{" "}
                {isRecruter ? (
                  <span style={{ color: "red" }}>* not allowed</span>
                ) : (
                  <span style={{}}>* letters and numbers</span>
                )}
              </p>
              <input
                type="text"
                name="password"
                value={password}
                minLength="10"
                maxLength="50"
                onChange={(ev) => this.handleChange(ev)}
                placeholder="Between 10 and 50 chars including: letter, number and symbol"
                disabled={isRecruter ? true : false}
                style={{ background: isRecruter && "gray" }}
              />

              <p className="edit-info">birthday</p>
              {/* // TODO : sanitize date! */}
              <input
                type="date"
                min="1922-01-01"
                max={this.getMaxDate()}
                id="bday"
                name="bday"
                value={bday}
                onChange={(ev) => this.handleChange(ev)}
              />

              <p className="edit-info">city</p>
              <input
                type="text"
                name="city"
                value={city}
                minLength="1"
                maxLength="40"
                onChange={(ev) => this.handleChange(ev)}
              />

              <p className="edit-info">country</p>
              <input
                type="text"
                name="country"
                value={country}
                minLength="1"
                maxLength="40"
                onChange={(ev) => this.handleChange(ev)}
              />

              <p className="edit-info">religion</p>
              <input
                type="text"
                name="religion"
                value={religion}
                minLength="1"
                maxLength="40"
                onChange={(ev) => this.handleChange(ev)}
              />

              <p className="edit-info">denomination</p>
              <input
                type="text"
                name="denomination"
                value={denomination}
                minLength="1"
                maxLength="40"
                onChange={(ev) => this.handleChange(ev)}
              />

              <div id="buttons">
                <button
                  id="save-user-info"
                  onClick={() => this.handleUpdateUserInfo()}
                >
                  Save
                </button>
                <button
                  id="cancel-user-info"
                  onClick={() => {
                    onSectionToggle({ to: "member profile" });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUserInfo;
