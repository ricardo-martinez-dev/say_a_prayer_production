// USED

import "./style.css";
import React from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
require("dotenv").config();

class Donate extends React.Component {
  render() {
    return (
      <div
        id="donate"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>Donate</h2>

        <div id="donation">
          <h2 id="msg">Be a partner!</h2>
          <p id="msg">Help us reach more people.</p>

          <PayPalScriptProvider
            options={{
              // TODO : CHANGE FROM DEVELOPMENT TO PRODUCTION BEFORE DEPLOYING
              "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order
                  .create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: "5.00",
                        },
                      },
                    ],
                  })
                  .then((orderId) => {
                    return orderId;
                  });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(async (details) => {
                  const { user_id, email, password } =
                    this.props.properties.userInfo;

                  const url = `${process.env.REACT_APP_API_URL}/donate`;
                  const obj = {
                    user_id,
                    email,
                    password,
                    details,
                    donation: "5.00",
                  };
                  const res = await axios.post(url, obj);

                  if (res.status == 200) {
                    alert("Thank you for your donation!");
                  }
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    );
  }
}

export default Donate;
