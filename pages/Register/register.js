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
