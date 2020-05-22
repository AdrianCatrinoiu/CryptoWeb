let listaFavorit = JSON.parse(localStorage.getItem("listaFavorit")) || []; //declaram o lista pentru stelutele de favorit
function initfavorite() {
  // functie care initializeaza stelutele de favorit si asculta pentru click
  const starsArray = document.querySelectorAll(".fa-star");

  starsArray.forEach((star) => {
    listaFavorit.forEach((element) => {
      if (star.getAttribute("name") == element) {
        //verificam daca avem in localStorage stelute deja puse la favorit
        star.classList.toggle("favourite");
      }
    });

    star.addEventListener("click", function () {
      listaFavorit = JSON.parse(localStorage.getItem("listaFavorit")) || [];
      if (star.getAttribute("class") == "fa fa-star") {
        //daca o steluta este apasata pentru a marca favorit aceasta este pusa in localStorage
        listaFavorit.push(star.getAttribute("name"));
        localStorage.setItem("listaFavorit", JSON.stringify(listaFavorit));
      }
      if (star.getAttribute("class") == "fa fa-star favourite") {
        //daca vrem sa scoatem o cryptomoneda de la favorit scoatem steluta din localStorage
        listaFavorit = arrayRemove(listaFavorit, star.getAttribute("name"));
        localStorage.setItem("listaFavorit", JSON.stringify(listaFavorit));
      }

      star.classList.toggle("favourite"); //la click stelutei ii adaugam la class favourite care o face galbena
    });
  });
}
//functie pentru a scoate un element anume dintr-un array
function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

//afiseaza cryptomonede
document.getElementById("getCrypto").addEventListener("click", getCrypto);
const container = document.querySelector("#CryptoCurrency"); //container pentru toate cryptomonedele
const subcontainer = document.querySelector("#subcontainer"); //container pentru fiecare cryptomoneda
//functie care afiseaza cryptomonede in ordinea din json
function getCrypto() {
  fetch("/crypto") //apel get pentru a lua crypto.json
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      data.forEach((crypto) => {
        //cream un div care sa contina toate datele despre o cryptomoneda
        const tempCrypto = `<div id="crypto-div" data-id=${crypto.id}>  
            <ul class="crypto-ul">
            
                <li id="listacrypto">Cryptomoneda: ${crypto.name}   </li> <i class="fa fa-star" name=${crypto.name}></i> 
                <br><br>
                <li id="listacrypto">Value: ${crypto.value}</li>
                <br><br>
                <li id="listacrypto">Disponibil: ${crypto.available}</li>
                    <button id="buton-cumpara">Cumpara</button>
                <div class="input-container">
                    <input type="range" name="volum1" min="0" max="10000"
                     onchange="updateTextInput(this.value,${crypto.value},${crypto.id});"><br><br>
                    <input type="text" id="${crypto.id}" name="volum" class="input-cost" value=""><br>
                             
                </div>
                          
             </ul>
            
        </div><br>`;

        subcontainer.insertAdjacentHTML("beforeend", tempCrypto); //adaugam in subcontainer div-ul cu toate informatiile despre cryptomoneda curenta
      });

      initfavorite(); //
    });

  let buttoncrypto = document.getElementById("getCrypto");
  buttoncrypto.style.display = "none"; //dupa afisare ascundem butonul de afisare a cryptomonedelor
}
//functie care afiseaza cryptomonede dupa criteriul de sortare selectat
function getCryptoCrescator() {
  var selectBox = document.getElementById("selectBox");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value; //luam valoarea din selectbox

  subcontainer.innerHTML = "";

  fetch("/crypto") //apel get pentru a lua crypto.json
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let copielista = data;
      //verificam in ce mod sa sortam lista cu cryptomonede
      if (selectedValue == "crescator") {
        copielista.sort((a, b) => {
          return a.value - b.value;
        });
      } else if ((selectedValue = "descrescator")) {
        copielista.sort((a, b) => {
          return b.value - a.value;
        });
      }

      copielista.forEach((crypto) => {
        const tempCrypto = `<div id="crypto-div" data-id=${crypto.id}>  
            <ul class="crypto-ul">
            
                <li id="listacrypto">Cryptomoneda: ${crypto.name}   </li> <i class="fa fa-star" name=${crypto.name} ></i> 
                <br><br>
                <li id="listacrypto">Value: ${crypto.value}</li>
                <br><br>
                <li id="listacrypto">Disponibil: ${crypto.available}</li>
                    <button id="buton-cumpara">Cumpara</button>
                <div class="input-container">
                    <input type="range" name="volum1" min="0" max="10000"
                     onchange="updateTextInput(this.value,${crypto.value},${crypto.id});"><br><br>
                    <input type="text" id="${crypto.id}" name="volum" class="input-cost" value=""><br>
                             
                </div>
                          
             </ul>
            
        </div><br>`;

        subcontainer.insertAdjacentHTML("beforeend", tempCrypto); //adaugam in subcontainer toate datele despre cryptomoneda
      });
      initfavorite();
    });
}

//afiseaza cat vrei sa cumperi si cat costa volumul de monede selectat
function updateTextInput(val, cost, id) {
  document.getElementById(id).value =
    "Numar Monede:" + val + " Cost Total:" + val * cost;
}
