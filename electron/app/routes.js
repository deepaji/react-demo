/* eslint flowtype-errors/show-errors: 0 */
import React from "react";
import { Switch, Route } from "react-router";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
import CounterPage from "./containers/CounterPage";
import PusherPage from "./containers/PusherPage";
import Login from "./components/login/Login";
import { Redirect } from "react-router";
import { connect } from "react-redux";

// const SomeComponent = props => {
//   return `THIS IS SOME COMPONENT: ${props.isAuthenticated}`;
// };

// //connect(SomeComponent)

// const SomeHigherOrderComponent = connect(mapStateToProps, null)(SomeComponent);

const PrivateRoute = props => {
  //let { component: Component, isAuthenticated, ...rest } = props

  // let Component = props.component
  // let isAuthenticated = props.isAuthenticated

  console.log(props.isAuthenticated);
  return (
    <Route
      {...props}
      render={props =>
        props.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const Routes = props => (
  <App>
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/counter" component={CounterPage} {...props} />
      <PrivateRoute path="/pusher" component={PusherPage} {...props} />
      <PrivateRoute path="/" component={HomePage} {...props} />
    </Switch>
  </App>
);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated
  };
};

export default connect(mapStateToProps, null)(Routes);
