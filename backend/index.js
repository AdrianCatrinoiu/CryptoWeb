const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
//pentru generare id unic
const uid = require("uid");
//pentru scrierea in json
const fs = require("fs");
//pentru accesare users
const userList = require("./databases/users.json");
//pentru trimitere mail la login nereusit
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "emailsenderexamenweb@gmail.com",
    pass: "parolaexamen12.",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(express.static("pages"));
app.use(express.static("databases"));
//
app.get("/", (req, res) => {
  res.send("Tehnici Web Api");
});
//request get pentru pagina de cumparare
app.get("/Cumparare", (req, res) => {
  res.sendFile(__dirname + "/pages/Cumparare/Cumparare.html");
});
//request get pentru pagina de vanzare
app.get("/Informatii", (req, res) => {
  res.sendFile(__dirname + "/pages/Informatii/Informatii.html");
});
//request get pentru pagina de register
app.get("/Register", (req, res) => {
  res.sendFile(__dirname + "/pages/Register/Register.html");
});
//request get pentru pagina de login
app.get("/Login", (req, res) => {
  res.sendFile(__dirname + "/pages/Login/Login.html");
});
//request get pentru pagina de home
app.get("/Home", (req, res) => {
  res.sendFile(__dirname + "/pages/Home/Home.html");
});
//request get pentru pagina de cumparare pentru afisarea cryptomonedelor
app.get("/crypto", (req, res) => {
  res.sendFile(__dirname + "/databases/crypto.json");
});
//request get pentru pagina de 404
app.get("*", (req, res) => {
  res.status(404).sendFile(__dirname + "/Error/Error.html");
});
//request post pentru inregistrarea unui nou utilizator(sa scriu ce contine obiectul trimis)
app.post("/register", (req, res) => {
  console.log("req:" + JSON.stringify(req.body));
  //cream un obiect de tip user pentru a stoca si trimite informatiile in fisierul users.json
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
    message: "success",
  });
});
//functie pentru a trimite mail user-ului care a avut mai mult de 5 incercari
// gresite de a se conecta
async function trimiteMail(user) {
  const mailOptions = {
    from: "emailsenderexamenweb@gmail.com",
    to: `${user.email}`,
    subject: "Incercare de conectare la contul dumneavoastra",
    text: "Cineva a incercat sa intre pe contul dumneavoastra!",
  };

  await transporter.sendMail(mailOptions);
}

//request de verificare date login
app.post("/loginCheck", async (req, res) => {
  const { username, password } = req.body;
  //200 = ok
  //401 = gresit
  const statusCode = "200";
  //ip
  console.log(req.ip.split(":").pop());
  const ip = req.ip.split(":").pop();

  returnObject = {
    message: "Username inexistent sau Parola gresita",
    statusCode: "401",
  };

  let userList = JSON.parse(fs.readFileSync("./databases/users.json", "utf8"));
  //luam numarul de useri pentru a stii daca am parcurs lista si nu am gasit user-ul
  let nrUser = Object.keys(userList).length;

  userList.forEach(async (user) => {
    if (user.username == username && user.password == password) {
      //ultima data de login
      let lastDate = user.lastLogin || null;
      //numarul de incercari pentru a intra pe cont
      user.attempts = 5;
      //ultimul ip de pe care s-a conectat
      lastIp = user.ip || null;
      user.ip = ip;
      //actuala data de login
      user.lastLogin = new Date();
      user.lastLogin = user.lastLogin.toLocaleString();
      //numarul de vizitari
      user.visitNumber = user.visitNumber + 1 || 1;
      //modificam user-ul

      fs.writeFile(
        "./databases/users.json",
        JSON.stringify(userList),
        (err) => {
          if (err) console.log("->> eroare: " + err);
          console.log("-> success");
        }
      );
      //daca numarul de vizite=1 atunci afisam mesaj de prima logare,
      //altfel afisam ip,data si numarul de login-uri
      returnObject = {
        message:
          user.visitNumber === 1
            ? "Salut, te-ai logat azi pentru prima oara"
            : `Salut, ${user.username}, ultima oara ai intrat de pe ip-ul ${lastIp} in ziua ${lastDate}.Ai vizitat site-ul de ${user.visitNumber} ori`,
        statusCode: "200",
      };
    } else if (user.username == username && user.pasword != password) {
      //daca e prima incercare retinem timpul la care aceasta a fost facuta
      if (user.attempts == 5) {
        user.firstLoginTry = Date.now();
      }

      let now = Date.now();

      //daca mai are incercari
      if (user.attempts > 0) {
        user.attempts = user.attempts - 1;
        //daca a depasit timpul limita de 30sec resetam numarul de incercari
        if (now - user.firstLoginTry > 30000) {
          user.attempts = 5;
        }
        //modificam user-ul
        fs.writeFile(
          "./databases/users.json",
          JSON.stringify(userList),
          (err) => {
            if (err) console.log("->> eroare: " + err);
            console.log("-> success");
          }
        );
        //afisam cate incercari mai are
        returnObject = {
          message: `Mai aveti ${user.attempts} incercari ramase pana la blocarea contului`,
          statusCode: "403",
        };
        return res.json(returnObject);
      }
      //daca nu mai are incercari sub 30 sec
      else if (user.attempts == 0) {
        //pentru trimitere email
        await trimiteMail(user);
        returnObject = {
          message: "Ati introdus datele incorect de prea multe ori",
          statusCode: "404",
        };
        mailSent = true;
        return res.json(returnObject);
      }
    }
    nrUser = nrUser - 1;
    //daca am parcurs lista de user-i si nu a fost gasit, vom trimite una dintre
    //erorile 401
    if (nrUser === 0) {
      return res.json(returnObject);
    }
  });
});

app.listen(3000, () => {
  console.log("Api listening to port 3000");
});
