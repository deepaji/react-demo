import React, { Component } from 'react'
import { Modal, Header, Button } from 'semantic-ui-react'
import { removeNotification } from './notification/notification.action'
import { connect } from 'react-redux'

class ViewReport extends Component {

  constructor (props) {
    super(props)

    this.state = {
      open: this.props.open
    }
  }

  dismiss (e) {
    this.props.removeNotification(this.props.email, this.props.machineId, this.props.item)
    this.setState({open: false})
    this.props.close()
  }

  render () {
    let {result} = this.props

    // result is an array of {status, content}

    return <Modal open={this.state.open}
                  onClose={this.close}>
      <Modal.Header>Report</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {result.map(r => {
            return <p style={{color: r.status === 'SUCCESS' ? 'green' : 'red'}}>{r.content}</p>
          })}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={this.dismiss.bind(this)}>
          Dismiss
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default connect(null, {removeNotification})(ViewReport)
