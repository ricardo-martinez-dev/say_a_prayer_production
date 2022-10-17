import "./style.css";
import React from "react";
import Spinner from "../spinner/Spinner";

const axiosFetch = require("../../utils/axiosFetch");

require("dotenv").config();

class LogPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogIn: false,
      showPassword: false,
      userCredentials: {
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmedPassword: "",
      },
      isLoading: true,
    };
  }

  async componentDidMount() {
    await this.setTester();
    this.setState({ isLoading: false });
  }

  setTester = async () => {
    const url = `${process.env.REACT_APP_API_URL}/recruter`;
    const obj = { url: window.location.href };
    const userCredentials = await axiosFetch.axiosPost({ url, obj });

    this.setState({ userCredentials });
  };

  handleInput = (event) => {
    const { userCredentials } = this.state;
    const { name, value } = event.target;

    this.setState({
      userCredentials: {
        ...userCredentials,
        [name]: value,
      },
    });
  };

  toggleSignLogView = () => {
    // toggle to log in
    const login = async () => {
      await this.setTester();

      this.setState({
        showLogIn: false,
        showPassword: true,
      });
    };

    // toggle to sign up
    const singup = () => {
      const userCredentials = {
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmedPassword: "",
      };

      this.setState({
        showLogIn: true,
        showPassword: false,
        userCredentials,
      });
    };

    // handle toggle between log in and sign up
    const toggleSignLogView = () => {
      const { showLogIn } = this.state;

      if (showLogIn) login();
      else singup();
    };

    toggleSignLogView();
  };

  handleLogIn = async () => {
    const { email, password } = this.state.userCredentials;
    const { onUserLogIn } = this.props.functions;

    const url = `${process.env.REACT_APP_API_URL}/login`;
    const obj = { email, password };
    const res = await axiosFetch.axiosPost({ url, obj });
    const invalidPassword = res.status === "error" || res.length === 0;

    if (invalidPassword) alert("User name or password not found!");
    else onUserLogIn(res);
  };

  handleSignUp = async () => {
    const { userCredentials } = this.state;
    const { onUserLogIn } = this.props.functions;

    const url = `${process.env.REACT_APP_API_URL}/signup`;
    const res = await axiosFetch.axiosPost({ url, obj: userCredentials });
    const { message, res: user } = res;

    if (message === "empty input") {
      alert("Please, make sure you fill every field!");
    }
    if (message === "user exists") alert("Email already in use!");
    if (message === "invalid password")
      alert(
        `Please, make sure your password contains:
       * between 10 and 50 characters
       * at least one lowercase letter
       * at least one uppercase letter
       * at least one numeric digit
       * at least one special character`
      );
    if (message === "unmatched passwords") {
      alert("Please, make sure your password match!");
    }

    if (res.status === "success") {
      const url = `${process.env.REACT_APP_API_URL}/login`;
      const obj = {
        email: userCredentials.email,
        password: userCredentials.password,
      };

      const result = await axiosFetch.axiosPost({ url, obj });

      onUserLogIn(result);
    }
  };

  togglePasswordVisibility = () => {
    this.setState({ showPassword: this.state.showPassword ? false : true });
  };

  handleMakeUserInput = (credential) => {
    const { showPassword, userCredentials, showLogIn } = this.state;

    const getHeader = (credential) => {
      let header = "";

      switch (credential) {
        case "fname":
          header = "first name";
          break;
        case "lname":
          header = "last name";
          break;
        case "confirmedPassword":
          header = "confirm password";
          break;
        default:
          header = credential;
      }

      return header;
    };

    const getInputType = (credential) => {
      let inputType = "";

      if (credential === "email") {
        inputType = "email";
      } else if (
        credential === "password" ||
        credential === "confirmedPassword"
      ) {
        if (showPassword) inputType = "text";
        else inputType = "password";
      } else {
        inputType = "text";
      }

      return inputType;
    };

    const getBorderStyle = (credential) => {
      if (!showLogIn) return;

      const { password, confirmedPassword } = userCredentials;
      const highlight =
        credential === "confirmedPassword" && password !== confirmedPassword;

      return highlight && ".2rem solid red";
    };

    return (
      <>
        <p>{getHeader(credential)}</p>
        <div id="input-field">
          <input
            type={getInputType(credential)}
            value={userCredentials && userCredentials[credential]}
            name={credential}
            required
            onChange={(event) => this.handleInput(event)}
            style={{ border: getBorderStyle(credential) }}
          />
          <span id="eye" onClick={() => this.togglePasswordVisibility()}>
            {credential === "password" && (
              <i
                className={`fa-regular fa-eye${showPassword ? "-slash" : ""}`}
              ></i>
            )}
          </span>
        </div>
      </>
    );
  };

  render() {
    const { showLogIn } = this.state;

    const logInView = ["email", "password"];
    const signUpView = [
      "fname",
      "lname",
      "email",
      "password",
      "confirmedPassword",
    ];

    return (
      <div id="log-page">
        <h1>Say a Prayer</h1>

        <div id="login-holder">
          <div id="creadentials-holder">
            <h2>{!this.state.showLogIn ? "Log in" : "Sign up"}</h2>

            <h3>
              <span>
                {showLogIn ? "Already " : "Don't you "} have an account?
              </span>
              <span id="sign-up-btn" onClick={() => this.toggleSignLogView()}>
                {showLogIn ? "Log In" : "Sign up"}
              </span>
            </h3>

            <div className="log-forms">
              {this.state.isLoading && <Spinner bgColor="#fff" />}

              {!this.state.isLoading && (
                <form onSubmit={(event) => event.preventDefault()}>
                  {showLogIn &&
                    signUpView.map((credential, i) => (
                      <React.Fragment key={i}>
                        {this.handleMakeUserInput(credential)}
                      </React.Fragment>
                    ))}

                  {!showLogIn &&
                    logInView.map((credential, i) => (
                      <React.Fragment key={i}>
                        {this.handleMakeUserInput(credential)}
                      </React.Fragment>
                    ))}

                  {showLogIn ? (
                    <button onClick={() => this.handleSignUp()}>Sign Up</button>
                  ) : (
                    <button onClick={() => this.handleLogIn()}>Log in</button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogPage;
