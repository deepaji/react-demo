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
        notification => notification.id !== action.originalData.id
      );
      return [].concat(filteredResult, updatedData);

    // case "UPDATE_RESULT_IN_NOTIFICATION":
    //   let filteredResult = notificationsList.filter(
    //     notification => notification.data !== action.originalData
    //   );

    //   let item = notificationsList.find(i => i.id === action.id);

    //   item.result = action.result;

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
