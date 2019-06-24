const Eris = require('eris');
const config = require('./config.json');

const bot = new Eris.CommandClient(config.token, {
    getAllUsers: true,
    restMode: true,
    defaultImageFormat: 'png'
}, {
    defaultHelpCommand: false,
    prefix: ['@mention ', config.prefix],
    defaultCommandOptions: {
        hidden: false,
        caseInsensitive: true,
        cooldown: 2000,
        cooldownExclusions: {
            userIDs: ['377781496292835339']
        },
        cooldownMessage: 'Too quick ! Please cool down.',
    }
})

module.exports = bot;