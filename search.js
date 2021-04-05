/*
  search.js
  Processing of search bar input
*/

var currencyMultiplier = 1;

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
    sendSearch();
  }

function sendSearch() {
    var searchString = window.location.search;
    var userSearch = searchString.slice(14);

    var resultDisplayDiv = document.getElementById("searchResultDisplay");
    resultDisplayDiv.innerHTML = '<h2 id="searchTerm"> Search for: "' + userSearch + '"</h2>';

    var searchURL = "https://www.cheapshark.com/api/1.0/games?title=" + userSearch + '&limit=24';

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            handleSearchResult(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", searchURL, false); // true for asynchronous, false for synchronous
    xmlHttp.send(null);
}

function handleSearchResult(response) {
    var gameArray = JSON.parse(response);

    var resultDisplayDiv = document.getElementById("searchResultDisplay");

    for(var i =0; i<gameArray.length; i++){ 
        var button = document.createElement("BUTTON");
        var gameId = gameArray[i].gameID;

        var searchURL = "https://www.cheapshark.com/api/1.0/games?id=" + gameArray[i].gameID;

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
             getImage(xmlHttp.responseText);
            }
        }
        xmlHttp.open("GET", searchURL, false); // true for asynchronous, false for synchronous
        xmlHttp.send(null);

        button.innerHTML = createButtonHTML(image, gameArray[i].external, gameArray[i].cheapest);

        button.onclick = createButtonTarget(gameId);
        resultDisplayDiv.appendChild(button);
    }
 }

 function getImage(J) {
    var gameInfo = JSON.parse(J);
    image = gameInfo.info.thumb
}

 function createButtonHTML(thumb, title, price) {
    return '<div class="gameCard">' +  
                '<img src=' + thumb + '>' +
                '<h2>' + title + '</h2>' +
                '<h3> $' + (price*currencyMultiplier).toFixed(2) + '</h3>' +
            '</div>';
}

function createButtonTarget(gameID) {
    return function () {
     location.href = "gameInfo.html?gameID=" + gameID;
    }
}