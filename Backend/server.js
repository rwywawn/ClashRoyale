const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(bodyParser());
app.use(cors());

app.post("/api/clans", async (req, res) => {
    console.log(`Connected`)
    
    const clanTag = req.body.clanTag;
    const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    const token = require('../token.js');
    const url = 'https://api.clashroyale.com/v1';
    const point = url +"/clans/%23"+ clanTag + "/members";
    const callApi = (endpoint, apiKey) => {
        const request = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            request.open('GET', endpoint, true);
            request.setRequestHeader('authorization', 'Bearer ' + apiKey);
            request.setRequestHeader('Content-Type', `application/json`);
            request.onload = function () {
                if (this.status === 200) {
                    resolve({ responseText:this.responseText, status:this.status })
                } else {
                    reject({ status: this.status, responseText: this.responseText })
                }
            }
            request.send();
        })
    }
   
    res.send(await callApi(point, token()).then(function (data) {
        
        return data;
    }).catch(function (error) {
        
        return error
    }));
})

app.listen(port, () => console.log(`Listening on port ${port}!`))