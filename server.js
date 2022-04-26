const express = require("express");
const cors = require("cors");
const whitelist = require("./configs/whitelist");
let app = express();

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.sites.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// app.use(cors(corsOptions))
app.use(express.json());

//GMS
const users = require("./routes/users")

app.use("/api/v1/healthnow/", users);


app.get("/", function(req, res) {
  res.send("Welcome to Healthnow API")
});

app.listen(process.env.PORT || 5500, function () {
  console.log("server is running on port 5500");
}); 