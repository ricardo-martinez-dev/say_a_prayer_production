import axios from "axios";
import React from "react";
require("dotenv").config();

class ExplorePrayerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prayer: {
        request_id: null,
        from_user: null,
        to_user: null,
        prayer: null,
      },
    };
  }

  // TODO : these next two function are similar to the functions in component Prayer

  // send prayer
  handleSendPrayer = async () => {
    // send new prayer
    const urlOne = `${process.env.REACT_APP_API_URL}/prayers/new`;
    const one = await axios
      .post(urlOne, this.state.prayer)
      .then((res) => {
        return { res: res.data, status: 200 };
      })
      .catch((err) => {
        return { status: 400, res: err };
      });

    if (one.status == 400) return;

    // update ranking
    const urlTwo = `${process.env.REACT_APP_API_URL}/ranking/sent`;

    await axios
      .post(urlTwo, this.state.prayer)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    this.setState({ showInput: false });
  };

  handlePrayerInput = (event) => {
    // sent prayer
    const prayer = event.target.value;
    // request id & receiver id
    const { _id, user_id } = this.props.properties;
    // sender
    const { from_user } = this.props;

    this.setState({
      prayer: {
        ...this.state.prayer,
        prayer: prayer,
        request_id: _id,
        from_user: from_user,
        to_user: user_id,
      },
    });
  };

  render() {
    const { onHideInput } = this.props;
    return (
      <div className="user-prayer">
        <textarea
          id="user-prayer-textarea"
          type="text"
          onChange={this.handlePrayerInput}
        />
        <div id="buttons">
          <button
            id="prayer-send"
            className="send"
            onClick={() => {
              this.handleSendPrayer();
              onHideInput();
            }}
          >
            Send
          </button>
          <button id="prayer-cancel" className="cancel" onClick={onHideInput}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default ExplorePrayerForm;
