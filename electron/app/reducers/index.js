// @flow
import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import counter from "./counter";
import login from "../components/login/login.reducer";

const rootReducer = combineReducers({
  counter,
  router,
  login
});

export default rootReducer;
