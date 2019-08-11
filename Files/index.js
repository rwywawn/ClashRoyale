
let apiKey = "J0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBlNzZiNzVhLWRlNjYtNGViZi05YzI1LTBlNGIyNDY0MDliNiIsImlhdCI6MTU2NTMwMTE1OCwic3ViIjoiZGV2ZWxvcGVyL2NiMDgxZjg3LTdiY2ItOTA4OC0zNTRlLWFkNDg5MjY0NzhkZSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI3MC41MC4xNS4yNCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.UBiBAigBoXWxBuiSlgo0y5GHgjX3WlZHK5CaNYuVT5PqBBUkuYNAawLwCkIodbzae7A-bVPNBjGb0Dc00ziQrA";
testEndpoint = '/clan/#LGG99U0';
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();

const url = 'https://api.clashroyale.com/v1';

endpoint = `${url}${testEndpoint}`;
request.open('GET', endpoint, { 'Authorization': `Bearer ${apiKey}` });
request.onload = function () {
    
    if (this.status === 200) {
        
        console.log(JSON.parse(this.responseText));
    } else {
        console.log(this.status)
    }
}
request.send()

