let user = require("../models/user");
let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {});

router.post("/", (req, res) => {
  if (!req.body.email) {
    res.status(400).send("Email is required");
  }

  let model = new user({
    user_email: req.body.email
  });

  model
    .save()
    .then(doc => {
      console.log(doc);
      //cb(null, doc);
      res.status(201).send();
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send(err);
      //cb(err);
    });

  // user.createUser(req.body.email, (err, doc) => {
  //   if (err) {
  //     return res.status(500).send(err);
  //   }

  //   res.status(201).send();
  // });
});

module.exports = router;
