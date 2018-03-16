import React, { Component } from 'react'
// import logo from './logo.svg'
import Counter from './counter'
import Notification from './notification'
import { Responsive, Header, Segment, Grid, Container } from 'semantic-ui-react'

//const App = () => "TEST"

class App extends Component {
  render () {
    return (
      <Container style={{marginTop: '4em'}}>
        <Segment padded={'very'}>
          <Header as='h2'>Notify Client</Header>
          <Notification/>
        </Segment>
        <Segment padded={'very'}>
          <Counter seed={10}/>
        </Segment>
      </Container>
    )
  }
}

/*
 return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );

*/
export default App
