import config from '../../config/config'
import request from 'superagent/superagent'

class NotificationClient {
  fetchNotifications (email, machineId) {
    return new Promise((resolve, reject) => {
      request
        .get(`${config.host}/api/notify/`)
        .query({machineId, email})
        .end((err, res) => {
          if (err) {
            return reject(err)
          }

          resolve(res)
        })
    })
  }

  acknowledgeNotification (email, machineId, notificationId) {
    return new Promise((resolve, reject) => {
      request
        .post(`${config.host}/api/notify/acknowledge`)
        .send({email, machineId, notificationId})
        .end((err, res) => {
          if (err) {
            return reject(err)
          }
          resolve(res)
        })
    })
  }

  updateNotification (email, machineId, notificationId, report) {
    return new Promise((resolve, reject) => {
      request
        .patch(`${config.host}/api/notify/report`)
        .send({email, machineId, notificationId, report})
        .end((err, res) => {
          if (err) {
            return reject(err)
          }
          resolve(res)
        })
    })
  }

  acceptNotification (email, machineId, notificationId) {
    return new Promise((resolve, reject) => {
      request
        .patch(`${config.host}/api/notify/accept`)
        .send({email, machineId, notificationId})
        .end((err, res) => {
          if (err) {
            return reject(err)
          }
          resolve(res)
        })
    })
  }

  dismissNotification (email, machineId, notificationId) {
    return new Promise((resolve, reject) => {
      request
        .patch(`${config.host}/api/notify/dismiss`)
        .send({email, machineId, notificationId})
        .end((err, res) => {
          if (err) {
            return reject(err)
          }
          resolve(res)
        })
    })
  }
}

export default new NotificationClient()
