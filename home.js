/*
  home.js
  Processing for home page categories
*/

function displayHome() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            storesInfo = JSON.parse(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", 'https://www.cheapshark.com/api/1.0/stores', false); // true for asynchronous, false for synchronous
    xmlHttp.send(null);

    getHotDeals();
    getBestDeals();
    getNewGames();
}

function getHotDeals() {

    var searchURL = "https://www.cheapshark.com/api/1.0/deals?pageSize=5&lowerPrice=3&steamRating=50";

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            displayHotDeals(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", searchURL, false); // true for asynchronous, false for synchronous
    xmlHttp.send(null);
}

function displayHotDeals(response) {
    gameArray = JSON.parse(response);

    var resultDisplayDiv = document.getElementById("Hot Deals");

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

function displayBestDeals(response) {
    gameArray = JSON.parse(response);

    var resultDisplayDiv = document.getElementById("Best Deals");

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

function displayNewGames(response) {
    gameArray = JSON.parse(response);

    var resultDisplayDiv = document.getElementById("New Games");

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

    function getImage(J) {
        var gameInfo = JSON.parse(J);
        image = gameInfo.info.thumb
    }

    function getStoreImage() {
        storeImage = 'https://www.cheapshark.com' + storesInfo[gameArray[i].storeID-1].images.logo
    }

    function createButtonHTML(thumb, title, storeImage, price) {
        return '<div class="gameCard">' +
            '<img id="gameImage" + src=' + thumb + '>' +
            '<h2>' + title + '</h2>' +
            '<h3> $' + price + '</h3>' +
            '<img id="storeImage" src=' + storeImage + '>' +       
            '</div>';
    }

function createButtonTarget(gameID) {
    return function () {
     location.href = "gameInfo.html?gameID=" + gameID;
    }
}