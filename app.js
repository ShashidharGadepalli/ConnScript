
require('dotenv').config();
const prompt = require("prompt-sync")();
var ftp_conn = require('./connections.js');
var request = require('request');
module.exports = connections;
const base_url = process.env['API_V1']
const auth_token = process.env['AUTH_TOKEN']
// console.log(ftp_conn)
payload = {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${auth_token}`
    },
    url: base_url + "/connections",
}
let connids = [];
let conntype = prompt("Enter connection you want to bring online FTP or HTTP Zendesk  ");
conntype = conntype.toLowerCase();
let connbbody = new Object();
switch (conntype) {
    case 'ftp':
        conntype = 'ftp';
        connbbody = connections.ftp_conn;
        break;
    case 'http':
        conntype = 'http';
        connbbody = connections.http_zendesk_connection;
        break;
    default:
        console.log('Invalid connection type');
        process.exit(1);
}
async function getConns() {
    return new Promise((resolve, reject) => {
        request(payload, function (error, response) {
            if (error) {
                reject(error);
            } else {
                let res = JSON.parse(response.body);
                console.log('Total no of connecttions are:', res.length)
                for (let i = 0; i < res.length; i++) {
                    if (res[i].type == conntype) {
                        connids.push(res[i]._id);
                    }
                }
                console.log(`Total no of offline ${conntype} connecttions are: `, connids.length)
                resolve(connids);
            }
        });
    });
}
getConns().then((connids) => {
    console.log("Making the conections online.......")
    for (let i = 0; i < connids.length; i++) {
        options = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${auth_token}`,
                'Content-Type': 'application/json'
            },
            url: base_url + "/connections/" + connids[i],
            body: JSON.stringify(connbbody)
        }
        //console.log(options.body)
        request(options, function (error, response) {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log(`Connection ${connids[i]} is now online`);
                //console.log('Response:', response.body);
            }
        });
    }
});
