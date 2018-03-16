// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import styles from "./Home.css";
import PusherJS from "pusher-js";
import TableHeader, { Container, Table } from "semantic-ui-react";

type Props = {};

export default class Pusher extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    console.log("In constructor");
    PusherJS.logToConsole = true;

    this.state = {
      data: null,
      url: null,
      notifications: []
    };
  }

  componentWillMount() {
    this.pusher = new PusherJS("a8caed348926f9c08aba", {
      cluster: "us2"
    });

    this.channel = this.pusher.subscribe("mychannel");

    this.channel.bind(
      "myevent",
      function(data) {
        console.log("Message received: ", data.message);

        let notifications = this.state.notifications.concat(data);

        this.setState({
          data,
          notifications
        });

        // Renderer Notification
        let myNotification = new Notification("Message Received", {
          body: data.message
        });

        myNotification.onclick = () => {
          console.log("Notification clicked");

          this.setState({
            url: this.state.data.url
          });
        };
      }.bind(this)
    );
  }

  // renderNotificationsList(list) {
  //   let result = list.map(item => {
  //     return (
  //       <div>
  //         <span>{item.message}</span>, <span>{item.url}</span>
  //       </div>
  //     );
  //   });

  //   return result;
  // }

  renderNotificationsList(list) {
    let result = list.map((item, index) => {
      return (
        <Table.Row id={index}>
          <Table.Cell width={6}>{item.message}</Table.Cell>
          <Table.Cell width={6}>{item.url}</Table.Cell>
          <Table.Cell width={4}>SOME ACTIONS</Table.Cell>
        </Table.Row>
      );
    });

    return result;
  }

  render() {
    let message = this.state.data ? this.state.data.message : "No Message";
    let url = this.state.url;

    return (
      <Container data-tid="container">
        <h2>Pusher</h2>
        <Link to="/">to Home</Link>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={6}>Message</Table.HeaderCell>
              <Table.HeaderCell width={6}>URL</Table.HeaderCell>
              <Table.HeaderCell width={4}>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderNotificationsList(this.state.notifications)}
          </Table.Body>
        </Table>
      </Container>
    );
  }

  /*
    <webview
            id="foo"
            style={{
              width: "100px",
              height: "100px"
            }}
            src={url}
          />
          */

  componentWillUnmount() {
    if (this.pusher) {
      this.channel.unbind();
      this.pusher.unsubscribe();
      this.pusher.disconnect();
    }
  }
}
