// export function addNotification(data) {
//   return {
//     type: "ADD_NOTIFICATION",
//     data
//   };
// }

import notificationClient from './notification.client'
import { ipcRenderer } from 'electron'

export function fetchNotifications (email, machineId) {
  return function (dispatch) {
    notificationClient
      .fetchNotifications(email, machineId)
      .then(data => {
        dispatch({
          type: 'FETCH_NOTIFICATIONS',
          data
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function addNotification (data, email, machineId) {
  // This is possible because of redux-thunk
  return function (dispatch) {
    notificationClient
      .acknowledgeNotification(email, machineId, data.id)
      .then(() => {
        dispatch({
          type: 'ADD_NOTIFICATION',
          data
        })

        if (data.type === 'status-check') {
          ipcRenderer.send('runStatusCheck', data)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function acceptNotification (data, email, machineId) {
  // This is possible because of redux-thunk
  return function (dispatch) {
    notificationClient
      .acceptNotification(email, machineId, data.id)
      .then(() => {
        dispatch({
          type: 'ACCEPT_NOTIFICATION',
          data
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function updateNotification (email, machineId, item, update) {
  return function (dispatch) {
    notificationClient
      .updateNotification(email, machineId, item.id, update.result)
      .then(() => {
        dispatch({
          type: 'UPDATE_NOTIFICATION',
          originalData: item,
          modifiedData: update
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function updateResultInNotification (id, result) {
  return {
    type: 'UPDATE_RESULT_IN_NOTIFICATION',
    id,
    result
  }
}

export function removeNotification (email, machineId, item) {
  return function (dispatch) {
    notificationClient
      .dismissNotification(email, machineId, item.id)
      .then(() => {
        dispatch({
          type: 'REMOVE_NOTIFICATION',
          data: item,
          originalData: item,
          modifiedData: {
            status: 'dismissed'
          }
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

}
