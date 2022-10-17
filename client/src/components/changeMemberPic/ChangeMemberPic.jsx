import "./style.css";
import React from "react";
import Resizer from "react-image-file-resizer";
const axios = require("axios");
require("dotenv").config();

class ChangeMemberPic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: "",
      isLoading: true,
    };
  }

  fileChangedHandler = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          200,
          200,
          "WEBP",
          200,
          0,
          async (uri) => {
            this.setState({ avatar: uri });

            // ! save in db
            const { user_id, password } = this.props.properties.userInfo;
            const obj = {
              avatar: uri,
              user_id,
              password,
            };

            const url = `${process.env.REACT_APP_API_URL}/avatar`;
            const result = await axios
              .post(url, obj)
              .then((res) => res.data)
              .catch((err) => console.log(err));
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  fetchAvatar = async () => {
    const { user_id, password } = this.props.properties.userInfo;
    const url = `${process.env.REACT_APP_API_URL}/avatar`;
    const obj = { user_id, password };

    const result = await axios
      .get(url, { params: obj })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    this.setState({ avatar: result });
  };

  async componentDidMount() {
    await this.fetchAvatar();
    this.setState({ isLoading: false });
  }

  render() {
    const { avatar } = this.state;

    return (
      <div id="change-picture">
        <div id="img">
          <img src={avatar} alt="avatar" />
        </div>

        <div id="button">
          <label id="lbl" htmlFor="load-pic" />
          <input
            type="file"
            id="load-pic"
            accept="image/*"
            onChange={(ev) => {
              this.fileChangedHandler(ev);
            }}
          />
        </div>
      </div>
    );
  }
}

export default ChangeMemberPic;
