const config = require('../../config');
const utils= require('../utils');

module.exports = bot => ({
    label: 'unlock',
    execute: async (msg, args) => {
    if (!msg.member.permission.has('banMembers' || 'manageGuild' || 'administrator')) return null;
    if (args[0]) {
            const channel = utils.resolveChannel(msg.channel.guild, args[0]);
            if (!channel) {
              return msg.channel.createMessage(`${config.emotes.error} CHannel not found.`)
            }
            let channelPerms = channel.permissionOverwrites.find(p => p.id === msg.channel.guild.id);
            let botUser = utils.resolveMember(msg.channel.guild, bot.user.id);
            if (!botUser) {
              return bot.createMessage(msg.channel.id, `${config.emotes.error} I can\'t verify my permissions. I can\'t lock that channel.`)
            }
            if (!botUser.permission.has('administrator') && !botUser.permission.has('manageGuild') && !botUser.permission.has('manageChannels')) {
              return msg.channel.createMessage(`${config.emotes.error} I don\'t have the permission to unlock that channel.`)
            }
            try {
                channel.editPermission(msg.channel.guild.id, channelPerms.allow | 2048, channelPerms.deny, 'role', 'Unlock');
                if (channel.type == '4') {
                  return msg.channel.createMessage(`${config.emotes.success} Unlocked category \`${channel.name}\`.`)
                } else if (channel.type == '0') {
                  return msg.channel.createMessage(`${config.emotes.success} Unlocked channel ${channel.mention}.`)
                }
            } catch (err) {
                return msg.channel.createMessage(`${config.emotes.error} An unknown error occured: \n\`\`\`\n${err}\n\`\`\``)
            }
        }
      },
      options: {
        description: 'Unlock a channel or a category',
        usage: 'unlock [channel / category ID]'
      }
})
