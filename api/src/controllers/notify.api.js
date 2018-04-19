let notification = require("../models/notification");
let machineNotification = require("../models/machine.notification");
let express = require("express");
let router = express.Router();
let pusher = require("../notify");

router.post("/", (req, res) => {
  try {
    if (!req.body.message) {
      throw new Error("Message is not specified");
    }
    if (!req.body.url) {
      throw new Error("URL is not specified");
    }
    // if (!req.body.expiration_date) {
    //   throw new Error("Expiration Date is not specified");
    // }
    if (!req.body.type) {
      throw new Error("Type is not specified");
    }

    console.log("deepa was here");
    let model = new notification({
      message: req.body.message,
      expiration_date: req.body.expiration_date,
      type: req.body.type,
      expired: false,
      url: req.body.url
    });

    model
      .save()
      .then(doc => {
        console.log(doc);
        pusher.triggerNotification(
          doc.id,
          doc.createdAt,
          doc.type,
          doc.message,
          doc.url
        );
        res.status(201).send("SUCCESS");
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });

    // pusher.triggerNotification(req.query.message, req.query.url);
    // res.send("SUCCESS");
  } catch (e) {
    console.error(e);
    // res.status(500).send(e.message);
    return res.status(400).send(e.message);
  }
});

// router.post("/", (req, res) => {
//   if (!req.body.message) {
//     return res.status(400).send("Message is required");
//   }
//   let model = new notification({
//     message: req.body.message,
//     expiration_date: req.body.expiration,
//     type: req.body.type
//   });
// });

router.post("/acknowledge", (req, res) => {
  try {
    // Validate body
    if (!req.body.email) {
      return res.status(400).send("Email is required");
    }

    if (!req.body.machineId) {
      return res.status(400).send("MachineId is required");
    }

    if (!req.body.notificationId) {
      return res.status(400).send("NotificationId is required");
    }

    // Add to machine-notifications collection
    let model = new machineNotification({
      email: req.body.email,
      machineId: req.body.machineId,
      notificationId: req.body.notificationId,
      action: "acknowledged"
    });

    model
      .save()
      .then(doc => {
        console.log(doc);
        res.status(201).send("SUCCESS");
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

router.patch("/accept", (req, res) => {
  try {
    // Validate body
    if (!req.body.email) {
      return res.status(400).send("Email is required");
    }

    if (!req.body.machineId) {
      return res.status(400).send("MachineId is required");
    }

    if (!req.body.notificationId) {
      return res.status(400).send("NotificationId is required");
    }

    let model = machineNotification
      .findOneAndUpdate(
        {
          email: req.body.email,
          machineId: req.body.machineId,
          notificationId: req.body.notificationId
        },
        {
          action: "accepted"
        }
      )
      .then(doc => {
        console.log(doc);
        res.status(204).send("SUCCESS");
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

module.exports = router;

// module.exports = function(app) {
//   // /api/v1/notify/
//   //app.get("/", (req, res));
// };
