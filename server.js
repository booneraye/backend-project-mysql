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
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.set("view engine", "ejs")

//GMS
const users = require("./routes/users")

app.use("/api/v1/sample/", users);

app.get("/", function(req, res) {
  res.send("Welcome to Sample API")
});

app.listen(process.env.PORT || 5500, function () {
  console.log("server is running on port 5500");
}); 
