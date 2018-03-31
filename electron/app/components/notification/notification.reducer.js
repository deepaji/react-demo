export function notifications(notificationsList = [], action) {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [].concat(notificationsList, action.data);
    default:
      return notificationsList;
  }
}
