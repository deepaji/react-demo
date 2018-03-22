/* eslint flowtype-errors/show-errors: 0 */
import React from "react";
import { Switch, Route } from "react-router";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
import CounterPage from "./containers/CounterPage";
import PusherPage from "./containers/PusherPage";

export default () => (
  <App>
    <Switch>
      <Route path="/counter" component={CounterPage} />
      <Route path="/pusher" component={PusherPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
