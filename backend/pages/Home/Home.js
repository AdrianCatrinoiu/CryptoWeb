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
