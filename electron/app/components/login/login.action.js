export function LoginAction(status, email) {
  return {
    type: "LOGIN",
    status,
    email
  };
}
