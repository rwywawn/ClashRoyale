
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const token = require('../.gitignore/token.js');
const testEndpoint = '/clans/%23LGG99U0/members';
const url = 'https://api.clashroyale.com/v1';
const point = url + testEndpoint;
const callApi = (endpoint, apiKey) => {

    update.innerHTML = "Loading";
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        request.open('GET', endpoint, true);
        request.setRequestHeader('authorization', 'Bearer ' + apiKey);
        request.setRequestHeader('Content-Type', `application/json`);
        request.onload = function () {
            if (this.status === 200) {
                resolve(request)
            } else {
                reject(this.responseText)
            }}
        request.send();
   
        
    })
}
const makeTable = (request) => {
    update.innerHTML = "Done";
    const parsed = (JSON.parse(request.responseText))
    var table = document.getElementById("table");
    parsed.items.forEach(function (member) {
        var row = document.createElement("tr");
        Object.entries(member).forEach(function (key) {
            if ((key[0] !== "clanRank") && (key[0] !== "previousClanRank") && (key[0] !== "clanChestPoints")) {
                if (key[0] === "arena") {
                    key[1] = key[1].name;
                }
                var cell = document.createElement("td");
                cell.textContent = key[1];
                row.appendChild(cell);
            }
        });
        table.appendChild(row);
    });
}

// website
let update = document.getElementById("word");

update.onclick = () => {
    callApi(point, token()).then(makeTable).catch(function (error) {
        update.innerHTML=('Something went wrong', error)
    })
}