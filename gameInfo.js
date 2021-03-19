/*
  gameInfo.js
  Processing  of user input
*/

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

function handleSearchResult(response) {
    var gameInfo = JSON.parse(response);

    var resultDisplayDiv = document.getElementById("game");

    var button = document.createElement("BUTTON");

    button.innerHTML = createButtonHTML(gameInfo.info.title, gameInfo.info.thumb, gameInfo.deals[0].price);
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
    for (var i = 0; i < gameInfo.deals.length; i++) {
        var button = document.createElement("BUTTON");

        button.innerHTML = createStoreButtonHTML(storesInfo[gameInfo.deals[i].storeID-1].storeName, 'https://www.cheapshark.com' + storesInfo[gameInfo.deals[i].storeID-1].images.logo, gameInfo.info.title, gameInfo.deals[i].price);

        resultDisplayDiv.appendChild(button);
    }
}

function createButtonHTML(title, thumb, price) {
    return '<div class="game">' +
        '<h2>' + title + '</h2>' +
        '<img src=' + thumb + '/>' +
        '<h3> $' + price + '</h3>' +
        '</div>';
}

function createStoreButtonHTML(store, storeImage, title, price) {
    return '<div class="deal">' +
        '<img src=' + storeImage + '/>' +
        '<h2>' + store + '</h2>' +
        '<h3>' + title + '</h3>' +
        '<h3> $' + price + '</h3>' +
        '</div>';
}

