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
//functie care face highlight pe pagina curenta
function currentPage() {
  let url = window.location.pathname;
  url = url.substring(0, url.length - 1);
  if (document.getElementById("/Cumparare")) {
    document.getElementById("/Cumparare").classList.add("curent");
  }
  if (document.getElementById("/Vanzare")) {
    document.getElementById("/Vanzare").classList.add("curent");
  }
  if (document.getElementById("/Home")) {
    document.getElementById("/Home").classList.add("curent");
  }
  if (url == "/Login") {
    document.getElementById("login-button").classList.add("curent");
  }
  if (document.getElementById("/Register")) {
    document.getElementById("/Register").classList.add("curent");
  }
}
currentPage();
//functie care selecteaza marimea font-ului si o pune in local storage
function schimbaFont() {
  let scris_box = document.getElementById("scris");
  let scris_curent = scris_box.options[scris_box.selectedIndex].value;
  localStorage.setItem("font", scris_curent);
  //daca vrem sa resetam font-ul
  if (scris_curent == "Reset") {
    localStorage.removeItem("font");
    location.reload();
  }
  if (scris_curent == "font_mic") {
    document.body.style.fontSize = "12px";
  }
  if (scris_curent == "font_mediu") {
    document.body.style.fontSize = "18px";
  }
  if (scris_curent == "font_mare") {
    document.body.style.fontSize = "24px";
  }
}
//functie care actualizeaza font-ul conform selectiei salvate in local storage
function actualizeazaFont() {
  let actual = localStorage.getItem("font");
  let select_nou = document.getElementById("scris");
  if (actual == "font_mic") {
    document.body.style.fontSize = "12px";
  }
  if (actual == "font_mediu") {
    document.body.style.fontSize = "18px";
  }
  if (actual == "font_mare") {
    document.body.style.fontSize = "24px";
  }
  //facem update la valoarea default de la select cu optiunea din local storage
  for (var i, j = 0; (i = select_nou.options[j]); j++) {
    if (i.value == actual) {
      select_nou.selectedIndex = j;
      break;
    }
  }
}
actualizeazaFont();
