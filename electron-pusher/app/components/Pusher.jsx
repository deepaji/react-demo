// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import styles from "./Home.css";
import PusherJS from "pusher-js";
import { Container, Table, Button } from "semantic-ui-react";

// Renderer needs to use .remote
let {BrowserWindow} = require('electron').remote

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

    this.handleLinkClick = this.handleLinkClick.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
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

  handleLinkClick(e) {
    e.preventDefault()

    let win = new BrowserWindow({width: 800, height: 600})
    win.on('closed', () => {
      win = null
    })

    // Load a remote URL
    win.loadURL(e.target.href)

    // Or load a local HTML file
    // win.loadURL(`file://${__dirname}/app/index.html`)
  }

  handleDismissClick(e) {
    let id = e.target.attributes['itemid'].value

    let notifications = this.state.notifications
    let item = notifications.find(item => item.id === id)

    if(item) {
      item.dismiss = true
      this.setState({notifications})
    }
  }

  renderNotificationsList(list) {
    let result = list.map((item, index) => {
      return (
        <Table.Row key={index} negative={item.dismiss}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{item.date}</Table.Cell>
          <Table.Cell>{item.message}</Table.Cell>
          <Table.Cell><a href={item.url} onClick={this.handleLinkClick}>{item.url}</a></Table.Cell>
          <Table.Cell>
            <Button itemID={item.id} disabled={item.dismiss} onClick={this.handleDismissClick}>Dismiss</Button>
          </Table.Cell>
        </Table.Row>
      );
    });

    return result;
  }

  render() {
    return (
      <Container data-tid="container">
        <h2>Pusher</h2>
        <Link to="/">to Home</Link>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={6}>Id</Table.HeaderCell>
              <Table.HeaderCell width={2}>Timestamp</Table.HeaderCell>
              <Table.HeaderCell width={5}>Message</Table.HeaderCell>
              <Table.HeaderCell width={4}>URL</Table.HeaderCell>
              <Table.HeaderCell width={3}>Actions</Table.HeaderCell>
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
