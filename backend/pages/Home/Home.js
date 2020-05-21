window.onload = function () {
  setTimeout(function () {
    let username = localStorage.getItem("LoggedInUsername");
    if (username) {
      // alert("Bine ai venit "+username+" !");
      alert(`Bine ai venit ${username}!`);
    } else {
      alert("Bine ati venit!\nVa rugam sa va autentificati.");
    }
  }, 2000);
};

function verificareLogin() {
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn && isLoggedIn == "True") {
    document.querySelector("#login-button").innerHTML = "Log Out";
  }
}
verificareLogin();

function authCheck() {
  const button_text = document.querySelector("#login-button").innerHTML;
  console.log("a mers123");
  if (button_text == "Log Out") {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("LoggedInUsername");
  }
}
