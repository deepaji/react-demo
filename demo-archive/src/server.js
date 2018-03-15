let express = require("express");
let cors = require("cors");
let notify = require("./notify");
let app = express();

app.use(cors());
app.use(express.static("dist/public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/notify", (req, res) => {
  if (!req.query.message) {
    return res.status(400).send("Message not specified");
  }

  try {
    notify.triggerNotification(req.query.message);
    res.send("SUCCESS");
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

app.listen(3000, () => {
  console.log("Webserver is running...");
});
