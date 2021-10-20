"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var pokemons = [];
var pokeCardsGrid = document.getElementById("pokeCardsGrid");
var searchBarInput = document.getElementById("searchBarInput");
var navBar = document.getElementsByTagName("nav");
var toTopButton = document.getElementById("toTopButton");
var spinner = document.getElementById("spinner");

window.onscroll = function () {
  var d = document.documentElement;
  var offset = d.scrollTop + window.innerHeight;
  var height = d.offsetHeight;
  d.scrollTop >= 5 ? navBar[0].classList.add("navShadow") : navBar[0].classList.remove("navShadow");
  offset >= height - 30 ? toTopButton.style.display = "block" : toTopButton.style.display = "none";
};

toTopButton.onclick = function () {
  var d = document.documentElement;
  d.scrollTop = 0;
};

searchBarInput.oninput = function () {
  pokeCardsGrid.innerHTML = null;
  var pokeRegExp = new RegExp(searchBarInput.value, 'i');
  var filteredPokemons = pokemons.filter(function (pokemon) {
    return pokeRegExp.test(pokemon.name);
  });

  var _iterator = _createForOfIteratorHelper(filteredPokemons),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var pokemon = _step.value;
      renderCard(pokemon.name, pokemon.sprites, pokemon.height, pokemon.weight, pokemon.sale);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

var renderCard = function renderCard(name, sprites, height, weight, sale) {
  var cardContainer = document.createElement("div");
  var card = document.createElement("div");
  var cardImg = document.createElement("img");
  var cardBody = document.createElement("div");
  var cardTitle = document.createElement("h3");
  var cardText = document.createElement("div");
  var cardTextItem1 = document.createElement("p");
  var cardTextItem2 = document.createElement("p");
  var cardButton = document.createElement("button", {
    type: "button"
  });
  var saleBanner = document.createElement("div");
  var saleBannerText = document.createElement("h2");
  var titleContent = document.createTextNode(name.charAt(0).toUpperCase() + name.slice(1));
  var textItemContent1 = document.createTextNode("Altura: ".concat(height / 10, " m"));
  var textItemContent2 = document.createTextNode("Peso: ".concat(weight / 10, " kg"));
  var bannerTextContent = document.createTextNode("OFERTA");
  cardImg.src = sprites.other["official-artwork"].front_default;
  cardTitle.appendChild(titleContent);
  cardTextItem1.appendChild(textItemContent1);
  cardText.appendChild(cardTextItem1);
  cardTextItem2.appendChild(textItemContent2);
  cardText.appendChild(cardTextItem2);
  saleBannerText.appendChild(bannerTextContent);
  saleBanner.appendChild(saleBannerText);
  card.className = "card";
  cardBody.className = "cardBody";
  cardText.className = "cardText";
  cardTitle.className = "cardTitle";
  cardButton.className = "cardButton";
  cardButton.innerText = "AGREGAR";
  saleBanner.className = "saleBanner";
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardButton);
  card.appendChild(cardImg);
  card.appendChild(cardBody);
  if (sale) card.appendChild(saleBanner);
  cardContainer.appendChild(card);
  pokeCardsGrid.appendChild(cardContainer);
};

(function () {
  fetch("https://pokeapi.co/api/v2/pokemon/").then(function (data) {
    return data.json();
  }).then(function (_ref) {
    var results = _ref.results;

    var _iterator2 = _createForOfIteratorHelper(results),
        _step2;

    try {
      var _loop = function _loop() {
        var result = _step2.value;
        var sale = Math.random() < 0.5;
        fetch(result.url).then(function (data) {
          return data.json();
        }).then(function (_ref2) {
          var name = _ref2.name,
              sprites = _ref2.sprites,
              height = _ref2.height,
              weight = _ref2.weight;
          pokemons.push({
            name: name,
            sprites: sprites,
            height: height,
            weight: weight,
            sale: sale
          });
          renderCard(name, sprites, height, weight, sale);
        });
      };

      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }).then(function () {
    setTimeout(function () {
      spinner.style.display = "none";
      pokeCardsGrid.style.display = "flex";
    }, 2000);
  });
})();