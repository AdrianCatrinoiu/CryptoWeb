function menu_dropdown() {
  document.getElementById("iconmenu").classList.toggle("change");
  document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function (event) {
  if (event.target.matches(".dropdown")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
//DarkMode
function darkMode() {
  document.body.style.backgroundColor = "#737373";
}

var myVar = setInterval(myTimer, 1000);

function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("timp").innerHTML = t;
}

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
    localStorage.removeItem("listaFavorit");
  }
}
