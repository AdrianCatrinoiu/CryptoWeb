const baseUrl = "http://localhost:3000";
//functie care returneaza valoarea varstei selectate
function updateTextInput(val) {
  document.getElementById("age").value = val;
}
//functie care preia datele din formularul de register
async function getUserData() {
  //luam username
  let username = document.getElementById("username").value;
  //luam email
  let email = document.getElementById("email").value;
  //luam password
  let password = document.getElementById("password").value;
  //verificare parola prin regex
  const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?.,<>!@#$%^&*])[a-zA-Z0-9?.,<>!@#$%^&*]{8,}/;
  if (regex.test(password) == false) {
    alert(
      "Parola introdusa trebuie sa contina:\nCel putin 8 caractere\nCel putin o litera mica\nCel putin o litera mare\nCel putin o cifra\nCel putin un caracter special(?.,<>!@#$%^&*)"
    );
    return;
  }
  //luam experienta
  let experience = document.getElementById("experience").value;
  //luam gender
  let gender = Array.from(document.getElementsByName("gender")).find(
    (r) => r.checked
  ).value;
  //luam varsta
  let age = document.getElementById("age").value;
  //cream un obiect de tip user cu datele introduse pe care il trimitem catre backend
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
//functie care trimite datele catre backend
async function postData(path, data) {
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
