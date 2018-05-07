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
    let {result} = this.props.item

    // let style = {}
    //
    // if(result.success) {
    //   style.color = 'red'
    // }
    return <Modal open={this.state.open}
                  onClose={this.close}>
      <Modal.Header>Report</Modal.Header>
      <Modal.Content>
        <Modal.Description>
         <p>
           {result ? result.content : 'NO CONTENT'}
         </p>
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
