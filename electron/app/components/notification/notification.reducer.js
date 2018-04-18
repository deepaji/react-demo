export function notificationsReducer(notificationsList = [], action) {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [].concat(notificationsList, action.data);

    case "UPDATE_NOTIFICATION":
      let updatedData = Object.assign(
        {},
        action.originalData,
        action.modifiedData
      );

      let filteredResult = notificationsList.filter(
        notification => notification.data !== action.originalData
      );
      return [].concat(filteredResult, updatedData);

    case "ACCEPT_NOTIFICATION":
    case "REMOVE_NOTIFICATION":
      let result = notificationsList.filter(
        notification => notification !== action.data
      );
      return result;
    default:
      return notificationsList;
  }
}
