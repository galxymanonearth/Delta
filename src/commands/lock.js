const config = require('../../config');
const utils= require('../utils');

module.exports = bot => ({
    label: 'lock',
    execute: async (msg, args) => {
    if (!msg.member.permission.has('banMembers' || 'manageGuild' || 'administrator')) return null;
    if (args[0]) {
            const channel = utils.resolveChannel(msg.channel.guild, args[0]);
            let channelPerms = channel.permissionOverwrites.find(p => p.id === msg.channel.guild.id);
            if (channelPerms.has('sendMessages')) {
                return msg.channel.createMessage(`${config.emotes.error} That channel is already locked.`)
            }
            let botUser = utils.resolveMember(msg.channel.guild, bot.user.id);
            if (!botUser) {
              return bot.createMessage(msg.channel.id, `${config.emotes.error} I can\'t verify my permissions. I can\'t lock that channel.`)
            }
            if (!botUser.permission.has('manageChannels') && !botUser.permission.has('manageGuild') && !botUser.permission.has('manageChannels')) {
              return `${config.emotes.error} I don\'t have the permission to lock that channel.`
            }
            try {
                channel.editPermission(msg.channel.guild.id, channelPerms.allow, channelPerms.deny | 2048, 'role', 'Lock');
                return msg.channel.createMessage(`${config.emotes.success} Locked channel <#${channel.id}>.`)
            } catch (err) {
                return msg.channel.createMessage(`${config.emotes.error} An unknown error occured: \n\`\`\`\n${err}\n\`\`\``)
            }
        }
      },
      options: {
        description: 'Lock a channel',
        usage: 'lock [channel]'
      }
})
