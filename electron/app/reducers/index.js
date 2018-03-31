// @flow
import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import counter from "./counter";
import { login } from "../components/login/login.reducer";
import { notifications } from "../components/notification/notification.reducer";

const rootReducer = combineReducers({
  counter,
  router,
  isAuthenticated: login,
  notifications: notifications
});

export default rootReducer;
