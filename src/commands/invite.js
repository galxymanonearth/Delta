module.exports = bot => ({
    label: 'invite',
    execute: (msg) => {
        msg.channel.createMessage({
            embed: {
                description: `[<a:cursor:536942151591002153> Click here to invite me!](https://discordapp.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)`
            }
        })
    },
    options: {
        description: 'Invite me!'
    }
})