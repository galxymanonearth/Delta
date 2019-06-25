const config = require('../../config.json');

module.exports = bot => ({
    label: 'restart',
    execute: async(msg) => {
        let restartMessage = await msg.channel.createMessage('<a:loading:446974970669695014> Restarting...');
        process.exit(1);
        restartMessage.edit('<a:aGreenTick:585165117964943360> Successfully restarted.')
    },
    options: {
        aliases: ['r'],
        hidden: true,
        requirements: {
            userIDs: [config.ownersIDs]
        }
    }
})