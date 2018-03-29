export default function login(state = "", action) {
  switch (action.type) {
    case "LOGIN":
      return "LOGIN FAILED";
    default:
      return state;
  }
}
