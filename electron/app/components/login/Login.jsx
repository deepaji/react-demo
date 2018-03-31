import React, { Component } from "react";
import Divider, { Button, Checkbox, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { LoginAction } from "./login.action";
import * as ActionCreators from "./login.action";
import { bindActionCreators } from "redux";
import loginClient from "./login.client";
//type Props = { login: () => void }; //added by Deepa
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

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

    // try{
    //     let res = await this.loginClient(this.state.email)
    // }
    // catch(e) {
    // }

    // Using a promise here allows us to make blocking as well as non-blocking calls
    // depending on the use-case
    // by default, everything is non-blocking in JS / Node
    // The alternate way would be to do it using callbacks, but that wouldn't allow us
    // to make synchronous calls (like the try-catch block above)
    loginClient
      .login(this.state.email)
      .then(res => {
        this.props.LoginAction(true);
      })
      .catch(err => {
        console.error(err);
        this.props.LoginAction(false);
      });
  }
  render() {
    // true or false
    // 1 or 0
    console.log(this.props.loginStatus);
    if (this.props.loginStatus) {
      // print something
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h2>Login</h2>
        <Link to="/">to Home</Link>
        <br />

        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Field>
            <label>Email: </label>
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginStatus: state.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  console.log(ActionCreators);
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
//export default connect(mapStateToProps, { LoginAction })(Login);
