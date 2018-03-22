let Pusher = require("pusher");
let config = require("./config");
let uuidV4 = require('uuid/v4')

const channelName = "mychannel";
const eventName = "myevent";

class Notify {
  constructor() {
    // this.pusher = new Pusher({
    //   appId: "466192",
    //   key: "a8caed348926f9c08aba",
    //   secret: "6b07cb4bc18a98fea2a0",
    //   cluster: "us2"
    // });

    this.pusher = new Pusher(config.pusher);
  }

  triggerNotification(msg = "Default message", url = "http://www.google.com") {
    this.pusher.trigger(
      channelName,
      eventName,
      {
        id: uuidV4(),
        date: Date.now(),
        message: msg,
        url: url
      },
      null,
      function(err, req, res) {
        if (err) {
          console.error(err);
        }
        console.log(req);
        console.log(res);
      }
    );
  }
}

module.exports = new Notify(); // creates a singleton instance of the class

// This requires babel as current version of Node doesn't support it.
// You can only use module.exports
//export default new Notify();
