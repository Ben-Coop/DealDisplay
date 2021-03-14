/*
  search.js
  Processing of search bar input
*/


function sendSearch() {
    var searchString = window.location.search;
    var userSearch = searchString.slice(14);

    var searchURL = "https://www.cheapshark.com/api/1.0/games?title=" + userSearch;

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

}