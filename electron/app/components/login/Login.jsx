import React, { Component } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import * as ActionCreators from "./login.action";
import { bindActionCreators } from "redux";

class Login extends Component {
  constructor() {
    super();
    this.state = { email: "" };
  }

  handleEmailInput(event) {
    this.setState({ email: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    //call the client request

    this.props.login(this.state.email);
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Field>
          <label>Email: {this.props.loginStatus}</label>
          <input
            placeholder="Enter your email address"
            onChange={this.handleEmailInput.bind(this)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Password" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginStatus: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
