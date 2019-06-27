const config = require('../../config')

module.exports = bot => ({
    label: 'lock',
    execute: async (msg, args) => {
    if (!msg.member.permission.has('banMembers' || 'manageGuild' || 'administrator')) return null;
    if (args[0]) {
        if (args[0].includes('<' && '#' && '>')) {
            const channelID = args[0].replace(/<@|>/g, '');
            const channel = msg.channel.guild.channels.find(c => c.id === channelID);
            let channelPerms = channel.permissionOverwrites.find(p => p.id === msg.channel.guild.id);
            if (!channelsPerms.has('sendMessages')) {
                return msg.channel.createMessage(`${config.emotes.error} That channel is already locked.`)
            }
            let botUser = utils.resolveMember(msg.channel.guild, bot.user.id);
            if (!botUser) {
              return bot.createMessage(msg.channel.id, `${config.emotes.error} I can\'t verify my permissions. I can\'t lock that channel.`)
            }
            if (!botUser.permission.has('administrator') && !botUser.permission.has('manageGuild') && !botUser.permission.has('manageChannels')) {
              return `${config.emotes.error} I don\'t have the permission to lock that channel.`
            }
            try {
                channel.editPermission(msg.channel.guild.id, channelPerms.allow, channelPerms.deny | 2048, 'Lock');
                return msg.channel.createMessage(`${config.emotes.success} Locked channel <#${channelID}>.`)
            } catch (err) {
                return msg.channel.createMessage(`${config.emotes.error} An unknown error occured: \n\`\`\`\n${err}\n\`\`\``)
            }
        }
    }
}})