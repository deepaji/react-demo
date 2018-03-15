import React from "react";
import request from "superagent";

export default class Notification extends React.Component {
  constructor() {
    super();
    this.state = { message: "" };

    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.handleNotify = this.handleNotify.bind(this);
  }

  handleMessageInput(event) {
    // let obj = new Object()
    //let obj1 = {} // object literal
    console.log(event.target.value);
    this.setState({ message: event.target.value });
  }

  handleNotify(event) {
    // http://localhost:3000/notify?message=hello%20world
    request
      .get("http://localhost:3000/notify")
      .query({
        message: this.state.message,
        url: "http://www.google.com"
      })
      .end(function(err, res) {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Response", res.text);
      });
  }
  render() {
    return (
      <div>
        <div>
          <input
            id="message"
            type="text"
            placeholder="Enter a message"
            onChange={this.handleMessageInput}
          />
        </div>
        <div>
          <button onClick={this.handleNotify}>Notify</button>
        </div>
      </div>
    );
  }
}

//export const print = () => console.log("i am prionting");

// ES5 way of exporting (only way supported )
//module.exports = Notification

// Named export
//export { print as Print };
