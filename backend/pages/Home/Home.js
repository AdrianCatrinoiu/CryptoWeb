//functie care verifica daca un user este logat, daca acesta este logat, trimite un alert cu numele sau,
//daca nu va trimite un alert general

window.onload = function () {
  setTimeout(function () {
    let username = localStorage.getItem("LoggedInUsername");
    if (!username) {
      alert("Bine ati venit!\nVa rugam sa va autentificati.");
    }
  }, 2000);
};
