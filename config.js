const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
if (!config) {
    config = {
        "token": process.env.TOKEN,
        "mongoDBURL": null,
        "prefix": "/",
        "ownersIDs": null,
        "emotes": null,
        "webhooks": {
            "logs": {
                "ID": "592768515199467550",
                "token": process.env.LOGS_WEBHOOK_TOKEN
            }
        }
    }}

module.exports = config;