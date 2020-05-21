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
