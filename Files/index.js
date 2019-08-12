
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBlNzZiNzVhLWRlNjYtNGViZi05YzI1LTBlNGIyNDY0MDliNiIsImlhdCI6MTU2NTMwMTE1OCwic3ViIjoiZGV2ZWxvcGVyL2NiMDgxZjg3LTdiY2ItOTA4OC0zNTRlLWFkNDg5MjY0NzhkZSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI3MC41MC4xNS4yNCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.UBiBAigBoXWxBuiSlgo0y5GHgjX3WlZHK5CaNYuVT5PqBBUkuYNAawLwCkIodbzae7A-bVPNBjGb0Dc00ziQrA";
const testEndpoint = '/clans/%23LGG99U0/members';
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const url = 'https://api.clashroyale.com/v1';

const point = url+testEndpoint;

const callApi = (endpoint, apiKey) => {
    
    var request = new XMLHttpRequest();
    request.open('GET', endpoint);
    request.setRequestHeader('authorization', 'Bearer ' + apiKey)
    request.setRequestHeader('Accept', `application/json`)
    request.addEventListener('load', read)
    function read(){

        if (this.status === 200) {

            console.log(JSON.parse(this.responseText));
        } else {
            console.log(this.status);
            console.log(this.responseText);
        }
    }
    request.send()

}
console.log(point);
console.log(token);
callApi(point, token);
