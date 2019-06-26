module.exports = bot => ({
    label: 'info',
    execute: async(msg) => {
        msg.channel.createMessage({
            embed: {
                title: 'Bot Information',
                timestamp: new Date(msg.createdAt),
                author: {
                    name: msg.author.username,
                    icon_url: msg.author.avatarURL
                },
                fields: [
                    {
                        name: 'Owners',
                        value: 'Hector#6704 and Frosty#8199',
                        inline: true
                    },
                    {
                        name: 'Servers',
                        value: bot.guilds.size,
                        inline: true
                    },
                    {
                        name: 'Users',
                        value: bot.users.size,
                        inline: true
                    },
                    {
                        name: 'Library',
                        value: 'Eris',
                        inline: true
                    },
                    {
                        name: 'Invite',
                        value: `[Click here](https://discordapp.com/api/oauth2/authorize?client_id=${bot.uder.id}&permissions=8&scope=bot)`,
                        inline: true
                    },
                    {
                        name: 'Server',
                        value: '[Click here](https://discord.gg/JBsJwMA)',
                        inline: true
                    }
                ],
                footer: {
                    text: `${bot.user.username} | Bot ID: ${bot.user.id}`,
                    icon_url: bot.user.avatarURL
                }
                }
        })
    },
    options: {
        aliases: ['stats'],
        description: 'Shows information about the bot',
        usage: 'info'
    }
})