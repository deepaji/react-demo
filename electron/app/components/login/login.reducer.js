export function login(state = null, action) {
  switch (action.type) {
    case "LOGIN":
      return action.status;
    default:
      return state;
  }
}
