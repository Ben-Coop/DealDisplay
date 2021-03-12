/*
  search.js
  Processing of search bar input
*/


function sendSearch() {
    var searchBar = document.getElementById('searchBar');
    var searchTitle = searchBar.value;

    var searchURL = "https://www.cheapshark.com/api/1.0/games?title=" + searchTitle;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            handleSearchResult(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", searchURL, true); // true for asynchronous 
    xmlHttp.send(null);
}

function handleSearchResult(response) {
 console.log(response);
}