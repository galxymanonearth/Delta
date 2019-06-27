const config = require('../../config');
const utils = require('../utils');

async function unbanUser (bot, msg, requirements) {
    let { user, args } = requirements
    try {
      let botUser = utils.resolveMember(msg.channel.guild, bot.user.id);
      if (!botUser) {
        return `${config.emotes.error} I can\'t verify my permissions. I can\'t unban that user.`
      }
      if (!botUser.permission.has('administrator') && !botUser.permission.has('manageGuild') && !botUser.permission.has('banMembers')) {
        return `${config.emotes.error} I don\'t have the permission to unban that user.`
      }
      let usr = user.user || user
      await bot.unbanGuildMember(msg.channel.guild.id, user.id, args[1]
        ? args.slice(1).join(' ')
        : `User Responsible: ${msg.author.username} (${msg.author.id})`)
        return `${config.emotes.success} Succesfully unbanned ${usr.username}#${usr.discriminator}.`
    } catch (err) {
      let er = err.message || err
      if (er.match('DiscordRESTError [50013]: Missing Permissions') || er.match('DiscordHTTPError [50013]: Missing Permissions')) {
        return `${config.emotes.error} I can\'t unban that user, they probably have higher roles than me.`
      }
    }
  };
  
  module.exports = bot => ({
    label: 'unban',
    execute: async (msg, args) => {
      if (!msg.member.permission.has('banMembers' || 'manageGuild' || 'administrator')) return null;
        let user = await bot.getRESTUser(args[0]).catch(() => bot.createMessage(msg.channel.id, '<a:aRedTick:585167776973586447> User not found.'))
        return bot.createMessage(msg.channel.id, await unbanUser(bot, msg, { user, args }))
    },
    options: {
        description: 'Unban a user',
        usage: 'unban [user] (reason)'
    }
})
