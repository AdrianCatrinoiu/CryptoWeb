function initfavorite() {
  const starsArray = document.querySelectorAll(".fa-star");

  console.log(document.querySelectorAll(".fa-star"));

  starsArray.forEach((star) => {
    star.addEventListener("click", function () {
      console.log("DAS");
      star.classList.toggle("favourite");
    });
  });
}

function compare(a, b) {
  const valueA = a.value;
  const valueB = b.value;
  let comparison = 0;
  if (valueA > valueB) {
    comparison = 1;
  } else if (valueA < valueB) {
    comparison = -1;
  }
}
//afiseaza cryptomonede

document.getElementById("getCrypto").addEventListener("click", getCrypto);
const container = document.querySelector("#CryptoCurrency");

function getCrypto() {
  fetch("../../backend/databases/crypto.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      data.forEach((crypto) => {
        const tempCrypto = `<div id="crypto-div" data-id=${crypto.id}>  
            <select id="sortareCrypto">
              <option value="nesortat">Nesortat</option>
              <option value="crescator" onclick="getCryptoCrescator()">Crescator</option>
              <option value="descrescator" onclick="getCryptoDescrescator()">Descrescator</option>
            </select>
            <ul class="crypto-ul">
            
                <li id="listacrypto">Cryptomoneda: ${crypto.name}   </li> <i class="fa fa-star" ></i> 
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

        container.insertAdjacentHTML("beforeend", tempCrypto);
      });
      initfavorite();
    });

  let buttoncrypto = document.getElementById("getCrypto");
  buttoncrypto.style.display = "none";
}

function getCryptoCrescator() {
  fetch("../../backend/databases/crypto.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      data.forEach((crypto) => {
        const tempCrypto = `<div id="crypto-div" data-id=${crypto.id}>  
            <select id="sortareCrypto">
              <option value="crescator" onclick="getCryptoCrescator()">Crescator</option>
              <option value="descrescator" onclick="getCryptoDescrescator()">Descrescator</option>
            </select>
            <ul class="crypto-ul">
            
                <li id="listacrypto">Cryptomoneda: ${crypto.name}   </li> <i class="fa fa-star" ></i> 
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

        container.insertAdjacentHTML("beforeend", tempCrypto);
      });
      initfavorite();
    });

  let buttoncrypto = document.getElementById("getCrypto");
  buttoncrypto.style.display = "none";
}

//afiseaza cat vrei sa cumperi
function updateTextInput(val, cost, id) {
  document.getElementById(id).value =
    "Numar Monede:" + val + " Cost Total:" + val * cost;
}
