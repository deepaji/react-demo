export function login(state = null, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        status: action.status,
        email: action.email
      };
    default:
      return state;
  }
}
