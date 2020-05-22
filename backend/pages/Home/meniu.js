//functie pentru meniu care face o scurta animatie a butonului de afisare meniu
function menu_dropdown() {
  document.getElementById("iconmenu").classList.toggle("change");
  document.getElementById("myDropdown").classList.toggle("show");
}
//afiseaza content-ul din meniu
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
//functie care afiseaza timpul
var myVar = setInterval(myTimer, 1000);

function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("timp").innerHTML = t;
}
//verificam daca utilizatorul este logat pe cont
function verificareLogin() {
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn && isLoggedIn == "True") {
    document.querySelector("#login-button").innerHTML = "Log Out";
  }
}
verificareLogin();

//daca este logat acesta are optiunea de a iesi din cont in locul butonului de login
function authCheck() {
  const button_text = document.querySelector("#login-button").innerHTML;
  if (button_text == "Log Out") {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("LoggedInUsername");
    localStorage.removeItem("listaFavorit");
  }
}
