import React, { Component } from "react";

function mapGlobalStateToProps(globalState) {
    return {
      notificationList: globalState.notificationList
    };
  }

function withMyHOC(WrappedComponent, mapStateToProps, actionCreator) {
  export default class MyHOC extends Component {
    constructor(props) {
      super(props);

      this.state = {
        hocData: [],
        actionCreator: (data) => {
            store.dispatch(actionCreator(data))
        }
      };
    }

    componentWillMount() {
        this.subscriptionId = store.subscribe((globalState) => {
            let localState = mapStateToProps(globalState)
            this.setState({
                ...localState
            })
        })
    }

    render() {
      return <WrappedComponent data={this.state.hocData} {...this.props} {...this.state} />;
    }

    componentWillUnmount() {
        store.unsubscribe(this.subscriptionId)
    }
  }
}

 class TestComponent extends Component {
     render() {
        //  this.context.store.dispatch(addNotification(data))
        //  this.props.addNotification(data)
         return (
             <div>
             {this.props.notificationList}
             </div>
         )
     }
 }

 export default withMyHOC(TestComponent, mapGlobalStateToProps, {
    addNotification,
    removeNotification
  })