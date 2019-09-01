
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const token = require('../.gitignore/token.js');

const submit = document.getElementById('submit');
const text = document.getElementById('info');


const makeTable = (request) => {
    
    const parsed = JSON.parse(request).items
    const table = document.getElementById("tableBody");
    console.log(table.rows.length)
    if (table.rows.length > 0) {
        for (let x = table.rows.length-1 ; x >= 0; x--) {
            table.deleteRow(x);
        }
    }
    parsed.forEach(function (member) {
        var row = document.createElement("tr");
        Object.entries(member).forEach(function (key) {
            if ((key[0] !== "clanRank") && (key[0] !== "previousClanRank") && (key[0] !== "clanChestPoints")) {
                if (key[0] === "arena") {
                    key[1] = key[1].name;
                }
                const cell = document.createElement("td");
                cell.textContent = key[1];
                row.appendChild(cell);
            }
        });
        table.appendChild(row);
    });
    text.innerHTML = "Done";
}

// website
submit.onclick = async () => {
    const clanTag = document.getElementById('clanTag').value;
    const clanReq = {
        "clanTag": clanTag
    }
   
    const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    const request = new XMLHttpRequest();
    
    const callApi = new Promise(function(resolve, reject) {
        request.open('POST', "http://localhost:3000/api/clans", true);
        request.setRequestHeader('Content-Type', `application/json`);
        request.onload = function () {
            if (this.status === 200) {
                
                if (JSON.parse(this.responseText).status === 200) {
                   
                    resolve(JSON.parse(this.responseText).responseText)
                } else {
                   
                    reject(JSON.parse(this.responseText))
                }
            
            } else {
                reject({ status: this.status, text: this.responseText })
            }
        }
        request.send(JSON.stringify(clanReq));
    })
    
    callApi.then(function (req) {
        makeTable(req);
    })
    .catch(function (error) {
        text.innerHTML = ('Error ' + error.status + " " + error.responseText); 
    })
}
