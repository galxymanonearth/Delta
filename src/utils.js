const bot = require('../bot')

function resolveMember (guild, arg) {

    if (!arg || !guild || guild.avalaible) {
      return null;
    }
  
    let user = guild.members.find(mem => mem.id === arg.replace('!', '').replace(/<@|>/g, '') || mem.user.username.toLowerCase().startsWith(arg.toLowerCase()) || mem.user.username.toLowerCase() === arg.toLowerCase() || `${mem.user.username.toLowerCase()}#${mem.user.discriminator}` === arg.toLowerCase() || (mem.nick && mem.nick.toLowerCase().startsWith(arg)) || (mem.nick && mem.nick.toLowerCase() === arg.toLowerCase()))
  
    return user;
}

function resolveUser (arg) {
  if (!arg) {
    return null
  }

  const user = bot.users.find(uzer => uzer.id === arg.replace('!', '').replace(/<@|>/g, '') || uzer.username.toLowerCase().startsWith(arg.toLowerCase()) || uzer.username.toLowerCase() === arg.toLowerCase() || `${uzer.username.toLowerCase()}#${uzer.discriminator}` === arg.toLowerCase())

  return user;

}

function resolveChannel (guild, arg) {

  if (!guild || !arg) {
    return null;
  }

  let channel = guild.channels.find(chan => chan.id === arg || chan.id === arg.replace(/<#|>/g, '') || chan.name === arg.toLowerCase());

  return channel;
}

module.exports = {
  resolveMember,
  resolveUser,
  resolveChannel
}