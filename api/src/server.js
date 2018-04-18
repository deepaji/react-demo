let express = require("express");
let cors = require("cors");
let notify = require("./notify");
let bodyParser = require("body-parser");
let app = express();
let userRoute = require("./controllers/user.api");
let notificationRoute = require("./controllers/notify.api");
let database = require("./database");

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("dist/public"));

app.use("/api/user", userRoute);
app.use("/api/notify", notificationRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/notify", (req, res) => {
//   if (!req.query.message) {
//     return res.status(400).send("Message not specified");
//   }
//   if (!req.query.url) {
//     return res.status(400).send("URL not specified");
//   }
//   try {
//     notify.triggerNotification(req.query.message, req.query.url);
//     res.send("SUCCESS");
//   } catch (e) {
//     console.error(e);
//     res.status(500).send(e.message);
//   }
// });

app.listen(3000, () => {
  console.log("Webserver is running on port 3000...");
});
