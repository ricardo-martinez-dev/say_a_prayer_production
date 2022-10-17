import "./style.css";
import React from "react";
import RequiredMessage from "../requiredMessage/RequiredMessage";

class PrayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prayer: null,
    };
  }

  handleChange = (ev) => {
    this.setState({ prayer: ev.target.value });
  };

  render() {
    const { handlePrayerInput, handleSendPrayer, handleInputDisplay } =
      this.props.functions;
    const { showInput, prayer } = this.props.properties;

    const isRequired = <RequiredMessage input={this.state.prayer} />;

    return (
      <React.Fragment>
        {showInput ? (
          <div className="user-prayer">
            <p id="req-input">New Prayer {isRequired}</p>
            <textarea
              type="text"
              id="user-prayer-textarea"
              onChange={(event) => {
                // ----------- DELETED CODE HERE ----------- //
                // ----------- DELETED CODE HERE ----------- //
                // ----------- DELETED CODE HERE ----------- //
              }}
              minLength="1"
              maxLength="100"
            />

            <div id="buttons">
              <button id="prayer-send" onClick={() => handleSendPrayer(prayer)}>
                Send
              </button>
              <button id="prayer-cancel" onClick={() => handleInputDisplay()}>
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default PrayerInput;
