const baseUrl = "http://192.168.0.69:3000";

//Afiseaza ora actuala
var myVar = setInterval(myTimer, 1000);

function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("timp").innerHTML = t;
}
//functie pentru a lua datele introduse in formularul de login
async function getUserData() {
  //luam username
  let username = document.getElementById("username").value;

  //luam password
  let password = document.getElementById("password").value;

  //cream un obiect de login cu username si password
  const loginData = {
    username,
    password,
  };

  //verificam daca exista deja un utilizator cu datele introduse
  const loginResponse = await postData("/loginCheck", loginData);
  console.log(loginResponse);
  //in functie de raspunsul din backend verificam ce mesaj am primit
  switch (loginResponse.statusCode) {
    case "200":
      alert(loginResponse.message);
      localStorage.setItem("isLoggedIn", "True");
      localStorage.setItem("LoggedInUsername", username);
      window.location.href = "http://192.168.0.69:3000/Home";
      break;
    case "401":
      alert(loginResponse.message);
      break;
    case "403":
      alert(loginResponse.message);
      break;
    case "404":
      alert(loginResponse.message);
      document.getElementById("loginbtn").disabled = true;
      setTimeout(function () {
        document.getElementById("loginbtn").disabled = false;
      }, 5000);
      break;
  }
}
//functie care trimite datele luate spre backend
async function postData(path, data) {
  console.log("login");
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
