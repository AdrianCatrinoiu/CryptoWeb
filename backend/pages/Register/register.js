//import { postData } from "./services/api";

const baseUrl = "http://localhost:3000";

function updateTextInput(val) {
  document.getElementById("age").value = val;
}
async function getUserData() {
  let username = document.getElementById("username").value;
  console.log(username);
  let email = document.getElementById("email").value;
  console.log(email);
  let password = document.getElementById("password").value;
  console.log(password);
  const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?.,<>!@#$%^&*])[a-zA-Z0-9?.,<>!@#$%^&*]{8,}/;
  console.log(regex.test(password));
  //(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?.,<>!@#$%^&*])[a-zA-Z0-9?.,<>!@#$%^&*]{8,}
  if (regex.test(password) == false) {
    alert(
      "Parola introdusa trebuie sa contina:\nCel putin 8 caractere\nCel putin o litera mica\nCel putin o litera mare\nCel putin o cifra\nCel putin un caracter special(?.,<>!@#$%^&*)"
    );
    return;
  }

  let experience = document.getElementById("experience").value;
  console.log(experience);
  let gender = Array.from(document.getElementsByName("gender")).find(
    (r) => r.checked
  ).value;
  let age = document.getElementById("age").value;
  console.log(age);

  const newUser = {
    username,
    email,
    password,
    experience,
    gender,
    age,
  };

  const newUserRegister = await postData("/register", newUser);
}

async function postData(path, data) {
  console.log("registering");
  const result = await fetch(baseUrl + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return result.json();
}

var myVar = setInterval(myTimer, 1000);

function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("timp").innerHTML = t;
}
