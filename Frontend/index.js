const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const token = require('../.gitignore/token.js');

const submit = document.getElementById('submit');
const text = document.getElementById('info');


const makeTable = (request) => {

    const parsed = JSON.parse(request).items
    const table = document.getElementById("tableBody");

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
                if (key[0] === "lastSeen"){
                    key[1] = parseDate(key[1]);
                }
                const cell = document.createElement("td");
                cell.textContent = key[1];

                if (key[0] === "expLevel"){
                  var img = document.createElement("img");
                  img.src = "../frontend/experience-levels/"+key[1]+".png";
                  img.classList.add("exp");
                  cell.textContent = '';
                  cell.appendChild(img);
                }

                row.appendChild(cell);
            }
        });
        table.appendChild(row);
    });
    text.innerHTML = "Done";
}
function parseDate(date){
    d = date.replace('T', '').match(/.{2}/g);
    //return ''+d[0]+d[1] + '-' + d[2] + '-' + d[3] + ' ' + d[4] + ':' + d[5];
    var options = {month: 'short', day: 'numeric', hour:'2-digit', minute: '2-digit', hour12: false };
    da = new Date(''+d[0]+d[1] + '-' + d[2] + '-' + d[3] + 'T' + d[4] + ':' + d[5]+':'+d[6]+".000z");
    return da.toLocaleDateString("en-US", options);
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
