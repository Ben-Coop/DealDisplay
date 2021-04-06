/*
  home.js
  Processing of home page categories
*/

var slideIndex = 1; //index for free games slideshow
var currencyMultiplier = 1; //multiplier for currency change function

//Changes from USD to CAD upon button press
function changeCurrency() {
    var button = document.getElementById("currencyButton");
    if (button.innerText == 'CAD') {
        button.innerText = "USD"
        button.innerHTML += '<img src="assets/US.png"/>'
        currencyMultiplier = 1;
    } else {
        button.innerText = "CAD";
        button.innerHTML += '<img src="assets/Canada.png"/>'
        currencyMultiplier = 1.26;
    }
    displayHome();
}

//Run several searches and display game-cards upon loading the page
function displayHome() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            storesInfo = JSON.parse(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", 'https://www.cheapshark.com/api/1.0/stores', false); // true for asynchronous, false for synchronous
    xmlHttp.send(null);

    getFreeGames()
    getHotDeals();
    getBestDeals();
    getNewGames();
}

//Sends HTTP search for hot deals
function getHotDeals() {

    var searchURL = "https://www.cheapshark.com/api/1.0/deals?pageSize=5&sortBy=deal+Rating&lowerPrice=0.01&steamRating=90&metacritic=86";

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            displayHotDeals(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", searchURL, false); // true for asynchronous, false for synchronous
    xmlHttp.send(null);
}

//Displays previous HTTP search results in game-cards
function displayHotDeals(response) {
    gameArray = JSON.parse(response);

    var resultDisplayDiv = document.getElementById("hotDealsGames");
    resultDisplayDiv.innerHTML = "";


    for (i = 0; i < gameArray.length; i++) {
        var button = document.createElement("BUTTON");
        var gameId = gameArray[i].gameID;

        var searchURL = "https://www.cheapshark.com/api/1.0/games?id=" + gameArray[i].gameID;

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                getImage(xmlHttp.responseText);
                getStoreImage();
            }
        }
        xmlHttp.open("GET", searchURL, false); // true for asynchronous, false for synchronous
        xmlHttp.send(null);

        button.innerHTML = createButtonHTML(image, gameArray[i].title, storeImage, gameArray[i].salePrice);

        button.onclick = createButtonTarget(gameId);
        resultDisplayDiv.appendChild(button);
    }
}

//Sends HTTP search for best deals
function getBestDeals() {

    var searchURL = "https://www.cheapshark.com/api/1.0/deals?pageSize=5&sortBy=Savings&steamRating=90&metacritic=90&lowerPrice=5";

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            displayBestDeals(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", searchURL, false); // true for asynchronous, false for synchronous
    xmlHttp.send(null);
}

//Displays previous HTTP search results in game-cards
function displayBestDeals(response) {
    gameArray = JSON.parse(response);

    var resultDisplayDiv = document.getElementById("bestDealsGames");
    resultDisplayDiv.innerHTML = "";


    for (i = 0; i < gameArray.length; i++) {
        var button = document.createElement("BUTTON");
        var gameId = gameArray[i].gameID;

        var searchURL = "https://www.cheapshark.com/api/1.0/games?id=" + gameArray[i].gameID;

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                getImage(xmlHttp.responseText);
                getStoreImage();
            }
        }
        xmlHttp.open("GET", searchURL, false); // true for asynchronous, false for synchronous
        xmlHttp.send(null);

        button.innerHTML = createButtonHTML(image, gameArray[i].title, storeImage, gameArray[i].salePrice);

        button.onclick = createButtonTarget(gameId);
        resultDisplayDiv.appendChild(button);
    }
}

//Sends HTTP search for new games
function getNewGames() {

    var searchURL = "https://www.cheapshark.com/api/1.0/deals?pageSize=5&sortBy=release";

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            displayNewGames(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", searchURL, false); // true for asynchronous, false for synchronous
    xmlHttp.send(null);
}

//Displays previous HTTP search results in game-cards
function displayNewGames(response) {
    gameArray = JSON.parse(response);

    var resultDisplayDiv = document.getElementById("newGames");
    resultDisplayDiv.innerHTML = "";


    for (i = 0; i < gameArray.length; i++) {
        var button = document.createElement("BUTTON");
        var gameId = gameArray[i].gameID;

        var searchURL = "https://www.cheapshark.com/api/1.0/games?id=" + gameArray[i].gameID;

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                getImage(xmlHttp.responseText);
                getStoreImage();
            }
        }
        xmlHttp.open("GET", searchURL, false); // true for asynchronous, false for synchronous
        xmlHttp.send(null);

        button.innerHTML = createButtonHTML(image, gameArray[i].title, storeImage, gameArray[i].salePrice);

        button.onclick = createButtonTarget(gameId);
        resultDisplayDiv.appendChild(button);
    }
}

//Sends HTTP search for free games
function getFreeGames() {

    var searchURL = "https://www.cheapshark.com/api/1.0/deals?&sortBy=price&upperPrice=0";

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            displayFreeGames(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", searchURL, false); // true for asynchronous, false for synchronous
    xmlHttp.send(null);
}

//Displays previous HTTP search results in game-cards
function displayFreeGames(response) {
    gameArray = JSON.parse(response);

    var resultDisplayDiv = document.getElementById("freeGame");
    resultDisplayDiv.innerHTML = "";


    for (i = 0; i < gameArray.length; i++) {
        var button = document.createElement("BUTTON");
        var gameId = gameArray[i].gameID;

        var searchURL = "https://www.cheapshark.com/api/1.0/games?id=" + gameArray[i].gameID;

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                getImage(xmlHttp.responseText);
                getStoreImage();
            }
        }
        xmlHttp.open("GET", searchURL, false); // true for asynchronous, false for synchronous
        xmlHttp.send(null);

        button.innerHTML = createSlideshowButtonHTML(image, gameArray[i].title, storeImage, gameArray[i].salePrice);
        button.className = "slideCard"

        button.onclick = createButtonTarget(gameId);
        resultDisplayDiv.appendChild(button);
    }
    showDivs(slideIndex);
}

//Isolates just the image from a JSON of game data
function getImage(J) {
    var gameInfo = JSON.parse(J);
    image = gameInfo.info.thumb
}

//Isolates just the store's image from a JSON of store data
function getStoreImage() {
    storeImage = 'https://www.cheapshark.com' + storesInfo[gameArray[i].storeID - 1].images.logo
}

//Returns dynamic HTML code used to create each game-card in the columns
function createButtonHTML(thumb, title, storeImage, price) {
    return '<div class="gameCard">' +
        '<img id="gameImage" + src=' + thumb + '>' +
        '<h2>' + title + '</h2>' +
        '<h3> $' + (price * currencyMultiplier).toFixed(2) + '</h3>' +
        '<img id="storeImage" src=' + storeImage + '>' +
        '</div>';
}

//Returns dynamic HTML code used to create each game-card in the slideshow
function createSlideshowButtonHTML(thumb, title, storeImage, price) {
    return '<div class="slideGameCard">' +
        '<img id="slideGameImage" + src=' + thumb + '>' +
        '<h2>' + title + '</h2>' +
        '<h3> $' + (price * currencyMultiplier).toFixed(2) + '</h3>' +
        '<img id="slideStoreImage" src=' + storeImage + '>' +
        '</div>';
}

//Returns the link to a certain deal, used inside a loop to asign a link to each game-card
function createButtonTarget(gameID) {
    return function () {
        location.href = "gameInfo.html?gameID=" + gameID;
    }
}

//Scrolls through the slideshow by hiding all game-cards except for index[i]
function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("slideCard");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "inline";
}

//Scrolls through the slideshow upon pressing the left or right arrow buttons
function plusDivs(n) {
    showDivs(slideIndex += n);
}