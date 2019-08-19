//calling api

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var token = require('../.gitignore/token.js');

const start = () => {
     
    const testEndpoint = '/clans/%23LGG99U0/members';
   
    const url = 'https://api.clashroyale.com/v1';
    
    const point = url + testEndpoint;
    const callApi = (endpoint, apiKey) => {
        update.innerHTML = "loading";
        var request = new XMLHttpRequest();
        
        request.open('GET', endpoint,true);
        request.setRequestHeader('authorization', 'Bearer ' + apiKey)
        request.setRequestHeader('Content-Type', `application/json`)
        request.addEventListener('load', read)
        
        
        function read() {

            if (this.status === 200) {
                
                const parsed = (JSON.parse(this.responseText));
                console.log(parsed);
                const members = parsed.items.map(current => current.name);
                console.log(members);
                update.innerHTML = "Done";
                makeTable(parsed.items)
            } else {
                console.log('Error ' + this.status);
                console.log(this.responseText);
                update.innerHTML = "Error";
            }
        }
        request.send()
    }
    callApi(point, token());
}
const makeTable = (array) => {
    var table = document.getElementById("table"); 
    array.forEach(function (member) {
        var row = document.createElement("tr");
        Object.entries(member).forEach(function (key) {
            
            if ((key[0] !== "clanRank" )&&( key[0] !== "previousClanRank") &&(key[0] !=="clanChestPoints")) {
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
    update.innerHTML = "clicked";
    start();
}