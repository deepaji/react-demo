export function login(state = null, action) {
  switch (action.type) {
    case "LOGIN":
      //store.state.isAuthenticated = action.status;

      return action.status;
    default:
      return state;
  }
}
