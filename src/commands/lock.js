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
            channel.editPermission(msg.channel.guild.id, channelPerms.allow, channelPerms.deny | 2048)
        }
    }
}})
