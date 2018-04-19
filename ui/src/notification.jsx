import React from "react";
import request from "superagent";
import { Grid, Form, Input, Button, Select } from "semantic-ui-react";

export default class Notification extends React.Component {
  constructor() {
    super();
    this.state = { message: "", url: "" };

    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.handleNotify = this.handleNotify.bind(this);
    this.handleURLInput = this.handleURLInput.bind(this);
    this.handleNotificationTypeSelect = this.handleNotificationTypeSelect.bind(
      this
    );
  }

  handleNotificationTypeSelect(e, { name, value }) {
    this.setState({ type: value });
  }

  handleURLInput(event) {
    this.setState({ url: event.target.value });
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
      .post("http://localhost:3000/api/notify")
      .send({
        message: this.state.message,
        url: this.state.url,
        type: this.state.type
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
      <Form>
        <Form.Group widths={"equal"}>
          <div>
            <Select
              placeholder="Select a notification type"
              options={[
                {
                  text: "Informational Message",
                  value: "info",
                  key: "info"
                },
                {
                  text: "Status Check",
                  value: "status-check",
                  key: "status-check"
                }
              ]}
              onChange={this.handleNotificationTypeSelect}
            />
            <Input
              id="message"
              type="text"
              placeholder="Enter a message"
              onChange={this.handleMessageInput}
            />
            <br />
            <Input
              id="url"
              type="text"
              placeholder="Enter the URL"
              onChange={this.handleURLInput}
            />
          </div>
        </Form.Group>
        <div>
          <Button onClick={this.handleNotify}>Notify</Button>
        </div>
      </Form>
    );
  }
}

//export const print = () => console.log("i am prionting");

// ES5 way of exporting (only way supported )
//module.exports = Notification

// Named export
//export { print as Print };
