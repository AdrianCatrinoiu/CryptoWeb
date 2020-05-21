let listaFavorit = JSON.parse(localStorage.getItem("listaFavorit")) || [];
function initfavorite() {
  const starsArray = document.querySelectorAll(".fa-star");

  starsArray.forEach((star) => {
    listaFavorit.forEach((element) => {
      if (star.getAttribute("name") == element) {
        console.log(star.getAttribute("name"));
        star.classList.toggle("favourite");
      }
    });

    star.addEventListener("click", function () {
      listaFavorit = JSON.parse(localStorage.getItem("listaFavorit")) || [];
      if (star.getAttribute("class") == "fa fa-star") {
        console.log("s-a activat");
        listaFavorit.push(star.getAttribute("name"));
        console.log(listaFavorit);
        localStorage.setItem("listaFavorit", JSON.stringify(listaFavorit));
      }
      if (star.getAttribute("class") == "fa fa-star favourite") {
        console.log("s-a dezactivat");
        listaFavorit = arrayRemove(listaFavorit, star.getAttribute("name"));
        console.log(listaFavorit);
        localStorage.setItem("listaFavorit", JSON.stringify(listaFavorit));
      }

      star.classList.toggle("favourite");
    });
  });
}
function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}
//afiseaza cryptomonede

document.getElementById("getCrypto").addEventListener("click", getCrypto);
const container = document.querySelector("#CryptoCurrency");
const subcontainer = document.querySelector("#subcontainer");
//functie care afiseaza cryptomonede in ordinea din json
function getCrypto() {
  fetch("/crypto")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      data.forEach((crypto) => {
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

        subcontainer.insertAdjacentHTML("beforeend", tempCrypto);
      });

      initfavorite();
    });

  let buttoncrypto = document.getElementById("getCrypto");
  buttoncrypto.style.display = "none";
}
//functie care afiseaza cryptomonede dupa criteriul de sortare selectat
function getCryptoCrescator() {
  var selectBox = document.getElementById("selectBox");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;

  subcontainer.innerHTML = "";

  fetch("/crypto")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let copielista = data;
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

        subcontainer.insertAdjacentHTML("beforeend", tempCrypto);
      });
      initfavorite();
    });
}

//afiseaza cat vrei sa cumperi
function updateTextInput(val, cost, id) {
  document.getElementById(id).value =
    "Numar Monede:" + val + " Cost Total:" + val * cost;
}

//localstorage pentru favorit
