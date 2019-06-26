const defaultConfig = {
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
}

module.exports = defaultConfig;