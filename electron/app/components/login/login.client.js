import config from "../../config/config";
import request from "superagent/superagent";

class LoginClient {
  login(email) {
    return new Promise((resolve, reject) => {
      request
        .post(`${config.host}/api/user`)
        .send({ email }) // sends a JSON post body
        .end((err, res) => {
          if (err) {
            return reject(err);
          }

          resolve(res);
          // Calling the end function will send the request
        });
    });
  }
}

export default new LoginClient();
