// export function addNotification(data) {
//   return {
//     type: "ADD_NOTIFICATION",
//     data
//   };
// }

import notificationClient from "./notification.client";
import { ipcRenderer } from "electron";

export function addNotification(data, email, machineId) {
  // This is possible because of redux-thunk
  return function(dispatch) {
    notificationClient
      .acknowledgeNotification(email, machineId, data.id)
      .then(() => {
        dispatch({
          type: "ADD_NOTIFICATION",
          data
        });

        if (data.type === "status-check") {
          ipcRenderer.send("runStatusCheck", data);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function acceptNotification(data, email, machineId) {
  // This is possible because of redux-thunk
  return function(dispatch) {
    notificationClient
      .acceptNotification(email, machineId, data.id)
      .then(() => {
        dispatch({
          type: "ACCEPT_NOTIFICATION",
          data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function updateNotification(item, update) {
  return {
    type: "UPDATE_NOTIFICATION",
    originalData: item,
    modifiedData: update
  };
}

export function updateResultInNotification(id, result) {
  return {
    type: "UPDATE_RESULT_IN_NOTIFICATION",
    id,
    result
  };
}

export function removeNotification(data) {
  return {
    type: "REMOVE_NOTIFICATION",
    data
  };
}
