const router = require("express").Router();
const bcrypt = require("bcryptjs");

var mysql = require("mysql");
var uuid = require("uuid");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test_database",
});

// generate hased password
const getHashedPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

//checks if the retrieved password and the provided password are the same
const checkHashedPassword = (password, hased) => {
  let matched = bcrypt.compareSync(password, hased);
  return matched;
};

router.route("/login").post((req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  let sql = `SELECT username, email_address, password, access_level FROM users WHERE username="${username}"`;
  con.query(sql, function (err, result) {
    if (err) {
      res.send({
        status: "failed",
        message: err,
      });
    } else {
      if (
        // result[0].password &&
        checkHashedPassword(password, result[0].password)
      ) {
        let data = result.map((r) => ({
          username: r.username,
          email_address: r.email_address,
          access_level: r.access_level,
          status: "success",
          message: "Username and Password matched!",
          token: uuid.v4(),
        }));

        res.send(data[0]);
      } else {
        res.send({
          status: "failed",
          message: "Username and Password not matched!",
        });
      }
    }
  });
});

router.route("/users").post((req, res) => {
  let sql = `SELECT id, first_name, last_name, address, post_code, contact_phone_number, email_address, username, access_level FROM users`;
  con.query(sql, function (err, result) {
    if (err) {
      res.send({
        status: "failed",
        message: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.route("/add_user").post((req, res) => {
  const {
    first_name,
    last_name,
    address,
    post_code,
    contact_phone_number,
    email_address,
    username,
    password,
    access_level,
  } = req.body;

  let sql = `INSERT INTO users 
  (first_name, last_name, address, post_code, contact_phone_number, email_address, username, password, access_level) 
  VALUES 
  ("${first_name}", 
  "${last_name}", 
  "${address}", 
  "${post_code}", 
  "${contact_phone_number}", 
  "${email_address}", 
  "${username}", 
  "${getHashedPassword(password)}", 
  "${access_level}")`;

  con.query(sql, function (err, result) {
    if (err) {
      res.send({
        status: "failed",
        message: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.route("/update_user").post((req, res) => {
  const {
    id,
    first_name,
    last_name,
    address,
    post_code,
    contact_phone_number,
    email_address,
    username,
    password,
    access_level,
  } = req.body;

  let sql = `UPDATE users SET first_name="${first_name}", 
  last_name="${last_name}", 
  address="${address}", 
  post_code="${post_code}", 
  contact_phone_number="${contact_phone_number}", 
  email_address="${email_address}", 
  username="${username}", 
  password="${getHashedPassword(password)}", 
  access_level="${access_level}" WHERE id="${id}" AND username="${username}"`;
  con.query(sql, function (err, result) {
    if (err) {
      res.send({
        status: "failed",
        message: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.route("/delete_user").post((req, res) => {
  const { id, username } = req.body;

  let sql = `DELETE FROM users WHERE id="${id}" AND username="${username}"`;
  con.query(sql, function (err, result) {
    if (err) {
      res.send({
        status: "failed",
        message: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.route("/multiple_delete_users").post((req, res) => {
  const { users } = req.body;
  let usersArray = users.map((u) => [u.id, u.username]);

  let sql = `DELETE FROM users WHERE (id, username) IN (?)`;
  con.query(sql, [usersArray], function (err, result) {
    if (err) {
      res.send({
        status: "failed",
        message: err,
      });
    }
    res.send(result);
  });
});

module.exports = router;
