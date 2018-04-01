/* eslint flowtype-errors/show-errors: 0 */
import React, {Component} from 'react'
import { Switch, Route } from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import CounterPage from './containers/CounterPage'
import PusherPage from './containers/PusherPage'
import Login from './components/login/Login'
import { Redirect, withRouter } from 'react-router'
import { connect } from 'react-redux'

// const SomeComponent = props => {
//   return `THIS IS SOME COMPONENT: ${props.isAuthenticated}`;
// };

// //connect(SomeComponent)

// const SomeHigherOrderComponent = connect(mapStateToProps, null)(SomeComponent);

export const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => {
  //let { component: Component, isAuthenticated, ...rest } = props

  // let Component = props.component
  // let isAuthenticated = props.isAuthenticated

  // return <Redirect to="/login" />;

  // console.log(props.isAuthenticated);
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login"/>
        )
      }}
    />
  )
}

export class Routes extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    console.log(this.props)
    return (
      <App>
        <Switch>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/counter" component={CounterPage} {...this.props} />
          <PrivateRoute path="/pusher" component={PusherPage} {...this.props} />
          <PrivateRoute path="/" component={HomePage} {...this.props} />
        </Switch>
      </App>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated
  }
}

// export default Routes

export default withRouter(connect(mapStateToProps, null)(Routes))
