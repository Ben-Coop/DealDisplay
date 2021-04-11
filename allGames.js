/*
  allGames.js
  Processing of all games page
*/

var input = ""; //user's input in the search bar
var filterType = "Deal Rating"; //selcted search term, default is deal rating
var sortDirection = 0; //0 for low-high, 1 for high-low
var pageNumber = 0; //current page number
    document.getElementById("Previous").disabled = true; //previous button is disabled on first page
var pageID = document.getElementById(pageNumber+1); //HTML ID of current page
    pageID.style.color = '#ee1c25'; 
var arrow = document.createElement("i");
    document.getElementById(filterType).appendChild(arrow); //arrow indicator in filtering section

var currencyMultiplier = 1; //multiplier for currency change function

//Changes from USD to CAD upon button press
function changeCurrency() {
    var button = document.getElementById("currencyButton");
    if(button.innerText == 'CAD'){
        button.innerText = "USD"
        button.innerHTML += '<img src="assets/US.png">'
        currencyMultiplier = 1;
    } else {
        button.innerText = "CAD";
        button.innerHTML += '<img src="assets/Canada.png">'
        currencyMultiplier = 1.26;    
    }
    getAllGames();
  }

//Filters the displayed games based on the user's input using the text bar
function filterInput() {
    input = document.getElementById("Input").value;
    getAllGames();
}

//Filters the displayed games based on the filter buttons
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

//Changes the currnent page upon pressing any of the paging buttons
function page(pageLocation) {
    pageID.style.color = '#000';
    document.getElementById("Previous").disabled = false;
    document.getElementById("Next").disabled = false;
    document.getElementById("gap2").innerHTML = "";
     if(pageLocation == 'Next') {
        pageNumber = pageNumber+1;        
    } else if(pageLocation == 'Previous') {
        pageNumber = pageNumber-1;
    } else {
        pageNumber = pageLocation-1;
    }

    if(pageNumber>-1 && pageNumber <10){
        pageID = document.getElementById(pageNumber+1);
        pageID.style.color = '#ee1c25';
        if (pageNumber==0) {
            document.getElementById("Previous").disabled = true;
        }
    } else {
        document.getElementById("gap2").innerHTML = pageNumber+1;
        document.getElementById("gap2").style.color = '#ee1c25';
    }
    getAllGames();
}

//Sends HTTP search for all games within filter parameters
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

//Displays previous HTTP search results in game-cards
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
    if(gameArray.length<20) {
        document.getElementById("Next").disabled = true;
    }
}

//Isolates just the image from a JSON of game data
function getImage(J) {
    var gameInfo = JSON.parse(J);
    image = gameInfo.info.thumb
 }

//Returns dynamic HTML code used to create each game-card 
function createButtonHTML(thumb, title, price) {
    return '<div class="gameCard">' +
        '<img src=' + thumb + '/>' +
        '<h2>' + title + '</h2>' +
        '<h3> $' + (price*currencyMultiplier).toFixed(2) + '</h3>' +
        '</div>';
}

//Returns the link to a certain deal, used inside a loop to asign a link to each game-card
function createButtonTarget(gameID) {
    return function () {
     location.href = "gameInfo.html?gameID=" + gameID;
    }
}