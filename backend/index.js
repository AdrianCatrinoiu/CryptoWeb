const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
//pentru generare id unic
const uid = require("uid");
//pentru scrierea in json
const fs = require("fs");
const userList = require("./databases/users.json");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(express.static("pages"));
app.use(express.static("databases"));

app.get("/", (req, res) => {
  res.send("Tehnici Web Api");
});

app.get("/Cumparare", (req, res) => {
  res.sendFile(__dirname + "/pages/Cumparare/Cumparare.html");
});
app.get("/Vanzare", (req, res) => {
  res.sendFile(__dirname + "/pages/Cumparare/Vanzare.html");
});
app.get("/Register", (req, res) => {
  res.sendFile(__dirname + "/pages/Register/Register.html");
});
app.get("/Login", (req, res) => {
  res.sendFile(__dirname + "/pages/Login/Login.html");
});
app.get("/Home", (req, res) => {
  res.sendFile(__dirname + "/pages/Home/Home.html");
});
app.get("/crypto", (req, res) => {
  res.sendFile(__dirname + "/databases/crypto.json");
});
app.get("*", (req, res) => {
  res.status(404).sendFile(__dirname + "/Error/Error.html");
});

app.post("/register", (req, res) => {
  console.log("a mers nodemon");
  console.log("req:" + JSON.stringify(req.body));
  const newUserData = {
    id: uid(32),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    experience: req.body.experience,
    gender: req.body.gender,
    age: req.body.age,
  };

  addNewUser = (newUserData) => {
    userList.push(newUserData);
    fs.writeFile("./databases/users.json", JSON.stringify(userList), (err) => {
      if (err) console.log("->> eroare: " + err);
      console.log("-> success");
    });
  };

  addNewUser(newUserData);

  res.json({
    type: "success",
  });
});

app.post("/loginCheck", (req, res) => {
  const { username, password } = req.body;

  let message = { message: "Cont inexistent" };
  if (!username) {
    message = { message: "Username lipsa" };
  }
  if (!password) {
    message = { message: "Parola lipsa" };
  }
  console.log("login2");
  let userList = JSON.parse(fs.readFileSync("./databases/users.json", "utf8"));
  console.log("users: " + JSON.stringify(userList));
  let userExists = false;

  userList.forEach((user) => {
    if (user.username == username && user.password == password) {
      message = { message: "Succes" };
    }
  });

  return res.json(message);
});

app.listen(3000, () => {
  console.log("Api listening to port 3000");
});
