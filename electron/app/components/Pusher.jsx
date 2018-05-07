// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import {
  acceptNotification,
  addNotification,
  removeNotification,
  updateNotification,
  fetchNotifications
} from './notification/notification.action'

import PusherJS from 'pusher-js'
import { Container, Table, Button } from 'semantic-ui-react'
import ViewReport from './view.report.jsx'

// Renderer needs to use .remote
let {BrowserWindow} = require('electron').remote

class Pusher extends Component {
  constructor (props) {
    super(props)

    this.state = {
      report: null
    }

    console.log('In constructor')
    PusherJS.logToConsole = true

    this.handleLinkClick = this.handleLinkClick.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
    this.handleAcceptClick = this.handleAcceptClick.bind(this)
    this.handleViewReport = this.handleViewReport.bind(this)
  }

  componentWillMount () {
    this.props.fetchNotifications(this.props.email, window.meta.machineId)

    this.pusher = new PusherJS('a8caed348926f9c08aba', {
      cluster: 'us2'
    })

    ipcRenderer.on('runStatusCheck-reply', (event, arg) => {
      this.props.updateNotification(
        this.props.email,
        window.meta.machineId,
        arg.data,
        {
          result: arg.result
        }
      )
      //this.props.updateResultInNotification(arg.id, arg.result);
    })

    this.channel = this.pusher.subscribe('mychannel')

    this.channel.bind(
      'myevent',
      function (data) {
        console.log('Message received: ', data.message)

        //let notifications = this.state.notifications.concat(data);

        // this.setState({
        //   data,
        //   notifications
        // });

        this.props.addNotification(
          data,
          this.props.email,
          window.meta.machineId
        )

        // Renderer Notification
        let myNotification = new Notification('Message Received', {
          body: data.message
        })

        myNotification.onclick = () => {
          console.log('Notification clicked')

          // this.setState({
          //   url: this.state.data.url
          // });
        }
      }.bind(this)
    )
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

  handleLinkClick (e) {
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

  handleAcceptClick (e) {
    let id = e.target.attributes['itemid'].value

    let notifications = this.props.notificationList
    let item = notifications.find(item => item.id === id)

    if (item) {
      //item.dismiss = true;
      //this.props.updateNotification(item, { dismiss: true });
      //this.setState({ notifications });
      this.props.acceptNotification(
        item,
        this.props.email,
        window.meta.machineId
      )
    }
  }

  handleDismissClick (e) {
    let id = e.target.attributes['itemid'].value

    let notifications = this.props.notificationList
    let item = notifications.find(item => item.id === id)

    if (item) {
      this.props.removeNotification(
        this.props.email,
        window.meta.machineId,
        item
      )
    }
  }

  handleViewReport (item) {
    if (item.result) {
      console.log('show report', item.result)
      this.setState({result: item, showReport: true})
    }
  }

  renderActions (item) {
    let btnList = []

    switch (item.type) {
      case 'info':
        btnList.push(
          <Button
            key={item.id + 'accept'}
            itemID={item.id}
            disabled={item.dismiss}
            onClick={this.handleAcceptClick}
          >
            Accept
          </Button>
        )
        break
      case 'status-check':
        if (!item.result) {
          item.result = {
            content: '123123'
          }
        }

        if (item.result) {
          btnList.push(
            <Button
              key={item.id + 'view-report'}
              itemID={item.id}
              disabled={item.dismiss}
              onClick={e => {
                this.handleViewReport(item)
              }}
            >
              View Report
            </Button>
          )
        }
    }

    btnList.push(
      <Button
        key={item.id + 'dismiss'}
        itemID={item.id}
        disabled={item.dismiss}
        onClick={this.handleDismissClick}
      >
        Dismiss
      </Button>
    )

    return btnList
  }

  renderNotificationsList (list) {
    let result = list.map((item, index) => {
      return (
        <Table.Row key={index} negative={item.dismiss}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{item.date}</Table.Cell>
          <Table.Cell>{item.message}</Table.Cell>
          <Table.Cell>
            <a href={item.url} onClick={this.handleLinkClick}>
              {item.url}
            </a>
          </Table.Cell>
          <Table.Cell>{this.renderActions(item)}</Table.Cell>
        </Table.Row>
      )
    })

    return result
  }

  render () {
    if (this.state.showReport) {
      return <ViewReport open={this.state.showReport}
                         email={this.props.email}
                         machineId={window.meta.machineId}
                         result={this.state.result}
                         close={() => {
                           this.setState({showReport: false, item: null})
                         }
                         }/>
    }

    return (
      <Container data-tid="container">
        <h2>Pusher</h2>
        <Link to="/">to Home</Link>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>Id</Table.HeaderCell>
              <Table.HeaderCell width={2}>Timestamp</Table.HeaderCell>
              <Table.HeaderCell width={5}>Message</Table.HeaderCell>
              <Table.HeaderCell width={3}>URL</Table.HeaderCell>
              <Table.HeaderCell width={3}>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderNotificationsList(this.props.notificationList)}
          </Table.Body>
        </Table>
      </Container>
    )
  }

  componentWillUnmount () {
    if (this.pusher) {
      this.channel.unbind()
      this.pusher.unsubscribe()
      this.pusher.disconnect()
    }
  }
}

function mapGlobalStateToProps (globalState) {
  return {
    email: globalState.auth.email,
    notificationList: globalState.notifications
  }
}

export default connect(mapGlobalStateToProps, {
  acceptNotification,
  addNotification,
  removeNotification,
  updateNotification,
  fetchNotifications
})(Pusher)
