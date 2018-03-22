import React from 'react'
import { Form, Statistic, Input, Button } from 'semantic-ui-react'

export default class Counter extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      seed: props.seed,
      counter: props.seed
    }

    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  componentWillMount () {
    // Subscribe to pusher
  }

  handleDecrement (e) {
    this.setState({counter: this.state.counter - 1}, () => {
      console.log(this.state.counter)
    })
    console.log(this.state.counter)
  }

  handleIncrement (e) {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  render () {
    return (
      <Form>
        <Statistic>
          <Statistic.Value>{this.state.counter}</Statistic.Value>
        <Statistic.Label>Counter</Statistic.Label>
        </Statistic>
        <hr/>
        <Button onClick={this.handleIncrement}>Increment</Button>
        <Button onClick={this.handleDecrement}>Decrement</Button>
      </Form>
    )
  }

  componentWillUnmount () {
    // Unsubscribe from pusher
  }
}
