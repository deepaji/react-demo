export function notificationsReducer (notificationsList = [], action) {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [action.data, ...notificationsList]

    case 'UPDATE_NOTIFICATION':
      let updatedData = Object.assign(
        {},
        action.originalData,
        action.modifiedData
      )

      let filteredResult = notificationsList.filter(
        notification => notification.id !== action.originalData.id
      )
      return [].concat(filteredResult, updatedData)

    case 'ACCEPT_NOTIFICATION':
    case 'REMOVE_NOTIFICATION':
      let result = notificationsList.filter(
        notification => notification !== action.data
      )
      return result

    case 'FETCH_NOTIFICATIONS':
      return action.data.body
    default:
      return notificationsList
  }
}
