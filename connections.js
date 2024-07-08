connections = {
    ftp_conn: {
        "type": "ftp",
        "name": "FTP CONNECTION",
        "offline": false,
        "sandbox": false,
        "ftp": {
            "type": "sftp",
            "hostURI": "celigo.files.com",
            "username": process.env['FTP_USERNAME'],
            "password": process.env['FTP_PASSWORD'],
            "port": 22,
            "usePassiveMode": true,
            "userDirectoryIsRoot": false,
            "useImplicitFtps": false,
            "requireSocketReUse": false,
            "concurrencyLevel": 1,
            "targetConcurrencyLevel": 1
        },
        "autoRecoverRateLimitErrors": true,
        "queues": [
            {
                "name": "643e5f00ba42d25a06bb5343",
                "size": 0
            }
        ]
    },
    http_zendesk_connection: {
        "type": "http",
        "name": "HTTP ZD connection",
        "offline": false,
        "sandbox": false,
        "http": {
            "formType": "http",
            "mediaType": "json",
            "baseURI": "https://d3v-celigo5000.zendesk.com/api/v2/",
            "disableStrictSSL": false,
            "ping": {
                "relativeURI": "organizations.json",
                "method": "GET",
                "successPath": "",
                "errorPath": "",
            },
            "unencrypted": {
                "field": "value",
            },
            "encrypted": "******",
            "auth": {
                "type": "basic",
                "basic": {
                    "username": process.env["ZENDESK_USERNAME"],
                    "password": process.env["ZENDESK_PASSWORD"],
                },
            },
        },
        "queues": [
            {
                "name": "59e06b30c147fc42676175c0",
                "size": 0,
            },
        ],
    }
}
module.exports = connections;
