import config from "../../config/config";
import request from "superagent/superagent";

class NotificationClient {
  acknowledgeNotification(email, machineId, notificationId) {
    return new Promise((resolve, reject) => {
      request
        .post(`${config.host}/api/notify/acknowledge`)
        .send({ email, machineId, notificationId })
        .end((err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        });
    });
  }

  acceptNotification(email, machineId, notificationId) {
    return new Promise((resolve, reject) => {
      request
        .patch(`${config.host}/api/notify/accept`)
        .send({ email, machineId, notificationId })
        .end((err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        });
    });
  }
}

export default new NotificationClient();
