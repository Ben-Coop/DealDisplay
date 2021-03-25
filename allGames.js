/*
  allGames.js
  Processing of all games page
*/

var input = "";
var filterType = "Deal Rating";
var sortDirection = 0; //0 for low-high, 1 for high-low
var pageNumber = 0;
var arrow = document.createElement("i");
document.getElementById(filterType).appendChild(arrow);

function filterInput() {
    input = document.getElementById("Input").value;
    getAllGames();
}

function filter(type) {
    if(filterType == type) {
        if(sortDirection == 0) {
            sortDirection = 1;
            arrow.style.transform = "rotate(-135deg)";
        } else {
            sortDirection = 0;
            arrow.style.transform = "rotate(45deg)";
        }
    } else {
        filterType = type;
        sortDirection = 0;
        document.getElementById(filterType).appendChild(arrow);
    }
    getAllGames();
}

function page(pageLocation) {
    if(pageLocation == 'first') {
        pageNumber = 0;
    } else if(pageLocation == 'last') {
        pageNumber = 0;
    } else if(pageLocation == 'Next') {
        pageNumber = pageNumber+1;        
    } else if(pageLocation == 'Previous') {
        pageNumber = pageNumber-1;
    } else {
        pageNumber = pageLocation-1;
    }
    getAllGames();
}

function getAllGames() {
    var resultDisplayDiv = document.getElementById("Games");
    
    resultDisplayDiv.innerHTML = "";

    var searchURL = "https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=20&sortBy=" + filterType + "&desc=" + sortDirection + "&pageNumber=" + pageNumber + "&title=" + input;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            displayAllGames(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", searchURL, false); // true for asynchronous, false for synchronous
    xmlHttp.send(null);
}

function displayAllGames(response) {
    gameArray = JSON.parse(response);

    var resultDisplayDiv = document.getElementById("Games");
    for (i = 0; i < gameArray.length; i++) { 
        var button = document.createElement("BUTTON");
        var gameId = gameArray[i].gameID;

        var searchURL = "https://www.cheapshark.com/api/1.0/games?id=" + gameArray[i].gameID;

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                getImage(xmlHttp.responseText);
            }
        }
        xmlHttp.open("GET", searchURL, false); // true for asynchronous, false for synchronous
        xmlHttp.send(null);

        button.innerHTML = createButtonHTML(image, gameArray[i].title, gameArray[i].salePrice);

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
            '<img src=' + thumb + '/>' +
            '<h2>' + title + '</h2>' +
            '<h3> $' + price + '</h3>' +
            '</div>';
    }

function createButtonTarget(gameID) {
    return function () {
     location.href = "gameInfo.html?gameID=" + gameID;
    }
}