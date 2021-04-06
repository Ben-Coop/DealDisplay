/*
  gameInfo.js
  Processing of user input on game-cards
*/

var currencyMultiplier = 1; //multiplier for currency change function

//Changes from USD to CAD upon button press
function changeCurrency() {
    var button = document.getElementById("currencyButton");
    if(button.innerText == 'CAD'){
        button.innerText = "USD"
        button.innerHTML += '<img src="assets/US.png"/>'
        currencyMultiplier = 1;
    } else {
        button.innerText = "CAD";
        button.innerHTML += '<img src="assets/Canada.png"/>'
        currencyMultiplier = 1.26;    
    }
    gameSearch();
  }

//Sends HTTP search for a specific game
function gameSearch() {
    var searchGame = window.location.search;
    var gameId = searchGame.slice(8);

    var searchURL = "https://www.cheapshark.com/api/1.0/games?id=" + gameId;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            handleSearchResult(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", searchURL, false); // true for asynchronous, false for synchronous
    xmlHttp.send(null);
}

//Displays previous HTTP search results in game-cards
function handleSearchResult(response) {
    var gameInfo = JSON.parse(response);

    var resultDisplayDiv = document.getElementById("gameHeader");
    resultDisplayDiv.innerHTML = "";

    var button = document.createElement("BUTTON");

    button.innerHTML = createButtonHTML(gameInfo.info.title, gameInfo.info.thumb, gameInfo.deals[0].retailPrice, gameInfo.deals[0].price, gameInfo.cheapestPriceEver.price);
    resultDisplayDiv.appendChild(button);

    var storesInfo;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            storesInfo = JSON.parse(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", 'https://www.cheapshark.com/api/1.0/stores', false); // true for asynchronous, false for synchronous
    xmlHttp.send(null);

    var resultDisplayDiv = document.getElementById("gameDeals");
    resultDisplayDiv.innerHTML = "";

    for (var i = 0; i < gameInfo.deals.length; i++) {
        var button = document.createElement("BUTTON");

        button.innerHTML = createStoreButtonHTML(storesInfo[gameInfo.deals[i].storeID-1].storeName, 'https://www.cheapshark.com' + storesInfo[gameInfo.deals[i].storeID-1].images.banner, gameInfo.info.title, gameInfo.deals[i].price);

        button.onclick = createButtonTarget(gameInfo.deals[i].dealID);
        resultDisplayDiv.appendChild(button);
    }
}

//Returns dynamic HTML code used to create the top game-card
function createButtonHTML(title, thumb, retailPrice, currentPrice, lowestPrice) {
    return '<div class="game">' +
        '<h2>' + title + '</h2>' +
        '<img src=' + thumb + '>' +
        '<h3> Retail Price: $' + (retailPrice*currencyMultiplier).toFixed(2) + '</h3>' +
        '<h3> Current Low: $' + (currentPrice*currencyMultiplier).toFixed(2) + '</h3>' +
        '<h3> All Time Low: $' + (lowestPrice*currencyMultiplier).toFixed(2) + '</h3>' +
        '</div>';
}

//Returns dynamic HTML code used to create each deal-card
function createStoreButtonHTML(store, storeImage, title, price) {
    return '<div class="deal">' +
        '<img src=' + storeImage + '>' +
        '<h2>' + title + '</h2>' +
        '<h3> From ' + store + '</h3>' +
        '<h4> $' + (price*currencyMultiplier).toFixed(2) + '</h4>' +
        '</div>';
}

//Returns the link to a certain deal, used inside a loop to asign a link to each deal-card
function createButtonTarget(dealID) {
    return function () {
     window.open("https://www.cheapshark.com/redirect?dealID={" + dealID + "}");
    }
}