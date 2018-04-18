# Express Server doing Push

demo-archive -> npm run dev

# React UI for Push Message Creation

my-app -> npm run dev

# Eletron App

electron-pusher -> npm run dev

# Connecting to Redux

* Define Actions

  * Create Action Creators

* Define Reducer for each action above

  * Go to reducers\index.js
    * Import reducer function defined above
    * Pass that function to combineReducers
      * The key name will be the attribute name in the global store combineReducers({notifications: notificationsReducerFunction})

All we have done so far is created functions to trigger an action (change of data) on the store. In order to dispatch the action, we need to import the specific action we are interested in and wire the component up to redux. At the same time we will pass that action to the connect method. In addition we have to define the specific attributes from the global store that we are intereste3d in.

* Import action creator function(s) in a component
* import connect from react-redux. This is what wires up react to redux.
  * Export the component by wrapping it in the connect function
    * export default connect(Notifications)
      * This is now a Higher Order Component (HOC). What it means is that it is wrapped by a parent component.
