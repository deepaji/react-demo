import React from "react";

export default class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seed: props.seed,
      counter: props.seed
    };

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  componentWillMount() {
    // Subscribe to pusher
  }

  handleDecrement(e) {
    this.setState({ counter: this.state.counter - 1 }, () => {
      console.log(this.state.counter);
    });
    console.log(this.state.counter);
  }

  handleIncrement(e) {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <div>
        <div>Counter is {this.state.counter}</div>
        <button onClick={this.handleIncrement}>Increment</button>
        <button onClick={this.handleDecrement}>Decrement</button>
      </div>
    );
  }

  componentWillUnmount() {
    // Unsubscribe from pusher
  }
}
