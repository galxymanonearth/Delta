const config = require('../../config');
const util = require('util');
const utils = require('../utils');
const sleep = util.promisify(setTimeout);

async function banUser (bot, msg, requirements) {
    let { user, args } = requirements
    try {
      let botUser = utils.resolveMember(msg.channel.guild, bot.user.id);
      if (!botUser) {
        return `${config.emotes.error} I can\'t verify my permissions. I can\'t ban that user.`
      }
      if (!botUser.permission.has('administrator') && !botUser.permission.has('manageGuild') && !botUser.permission.has('banMembers')) {
        return `${config.emotes.error} I don\'t have the permission to ban that user.`
      }
      let usr = user.user || user
      await bot.banGuildMember(msg.channel.guild.id, user.id, 7, args[1]
        ? args.slice(1).join(' ')
        : `User Responsible: ${msg.author.username} (${msg.author.id})`)
        return `${config.emotes.success} Succesfully banned ${usr.username}#${usr.discriminator}.`
    } catch (err) {
      let er = err.message || err
      if (er.match('DiscordRESTError [50013]: Missing Permissions') || er.match('DiscordHTTPError [50013]: Missing Permissions')) {
        return `${config.emotes.error} I can\'t ban that user, they probably have higher roles than me.`
      }
    }
  };
  
  module.exports = bot => ({
    label: 'ban',
    execute: async (msg, args) => {
      if (!msg.member.permission.has('banMembers' || 'manageGuild' || 'administrator')) return null;
      let user = utils.resolveMember(msg.channel.guild, args[0]);
      let userType = 'member'
      if (!user) {
        let rUser = await bot.getRESTUser(args[0]).catch(() => bot.createMessage(msg.channel.id, '<a:aRedTick:585167776973586447> User not found.'))
        user = rUser
        userType = 'rest'
      }
      if (userType === 'rest') {
        return bot.createMessage(msg.channel.id, await banUser(bot, msg, { user, args }))
      }
      if (user.permission.has('administrator') || user.permission.has('manageGuild')) {
        return bot.createMessage(msg.channel.id, '<a:aRedTick:585167776973586447> That user is a server admin/manager, I can\'t do that.')
      }
      if (user.id === msg.member.id) {
        return bot.createMessage(msg.channel.id, '<a:aRedTick:585167776973586447> Nice try. You can\'t ban yourself, sorry.')
      }
      return bot.createMessage(msg.channel.id, await banUser(bot, msg, { user, args }))
    },
    subcommands: [
      {
        label: 'mass',
        execute: async (msg, args) => {
          if (!msg.member.permission.has('banMembers' || 'manageGuild' || 'administrator')) return null;
          args = args.join(' ').split(' | ');
          const ids = args[0].split(' ');
          const reason = args[1] || 'No Reason specified';

            const users = [];
            for (const id of ids) {
                let add = true;
                let user = utils.resolveMember(msg.channel.guild, id);
                if (!user && id.match(/^\d+$/) ) {
                    user = await bot.getRESTUser(id).catch( () => {
                            add = false;
                        } );
                }
                if (!user) add = false;
                if (add && user.joinedAt) {
                    if (user.permission.has('administrator') || user.permission.has('manageGuild')) {
                        add = false;
                    }
                }
                if (add) users.push(user.id);
            }
    
            if (users.length === 0) return bot.createMessage(msg.channel.id, `${config.emotes.error} Users not found.`);
    
            let usersList = [];
            let success = 0;
            let errored = 0;
            const descrip = `${config.emotes.loading} Massbanning...`;
            const message = await bot.createMessage(msg.channel.id, descrip);
            for (const user of users) {
              const startError = errored;
                try {
                  let usr = resolveMember(msg.channel.guild, user)
                  msg.delete();
                  await msg.channel.guild.banMember(user, 7, reason);
                  success++;
                  message.edit(`${descrip} (${success}/${users.length})`);
                  usersList.push(`${usr.username}#${usr.discriminator}`)
                  await sleep(1000);
                } catch (e) {
                  errored++;
                }
              }
              let desc = success > 0 ? `**Banned** \`${success}\` members` : 'Failed to ban any members';
              if (errored > 0 && desc !== '**Failed** to ban any members') desc += `\nFailed to ban \`${errored}\` members`;
              if (desc !== 'Failed to ban any members') desc += `\n**Out** of \`${ids.length}\` members`;
              return message.edit( {
                content: '',
                embed: {
                    title: `${config.emotes.success} Massbanned Users`,
                    description: desc,
                    timestamp: new Date(),
                    fields: [
                      {
                        name: `Banned users`,
                        value: `\`\`\`\n${usersList.join('\n')}\`\`\``
                      }
                    ]
                  }});
                },
                options: {
                  description: 'Ban a list of user IDs.'
                }
              },
              {
                label: 'match',
                execute: async (msg, args) => {
                  if (!msg.member.permission.has('banMembers' || 'manageGuild' || 'administrator')) return null;
                  let query;
                  let reason = 'No reason';
                  if (args.includes('|') ) {
                      const eh = args.join(' ').split(' | ');
                      if (eh[1] ) reason = eh[1];
                      query = eh[0];
                  } else {
                      query = args.join(' ');
                  }
          
                  const msgs = await msg.channel.getMessages(100);
          
                  let messge = await bot.createMessage(msg.channel.id, `${config.emotes.loading} Searching for messages matching \`${query}\`...`);
                  const messages = msgs.filter(m => m.content.includes(query) && !m.member.permission.has('manageGuild' || 'administrator') && m.author.id !== bot.user.id && m.author.id !== config.owner.id);
                  if (!messages || messages.length === 0) return messge.edit(`${config.emotes.error} No messages found.`);
                  const ids = messages.map(m => m.author.id);

                    const users = [];
                    for (const id of ids) {
                      let add = true;
                      let user = resolveMember(msg.channel.guild, id);
                      if (!user && id.match(/^\d+$/) ) {
                        user = await bot.getRESTUser(id).catch( () => {
                          add = false;
                        } );
                      }
                      if (!user) add = false;
                      if (add && user.joinedAt) {
                        if (user.permission.has('administrator') || user.permission.has('manageGuild')) {
                          add = false;
                        }
                      }
                      if (add) users.push(user.id);
                    }
            
                    if (users.length === 0) return bot.createMessage(msg.channel.id, `${config.emotes.error} Users not found.`);
            
                    let usersList = [];
                    let success = 0;
                    let errored = 0;
                    const descrip = `${config.emotes.loading} Massbanning...`;
                    const message = await mssge.edit(msg.channel.id, descrip);
                    for (const user of users) {
                      const startError = errored;
                        try {
                          let usr = resolveMember(msg.channel.guild, user)
                          msg.delete();
                          await msg.channel.guild.banMember(user, 7, reason);
                          success++;
                          message.edit(`${descrip} (${success}/${users.length})`);
                          usersList.push(`${usr.username}#${usr.discriminator}`)
                          await sleep(1000);
                        } catch (e) {
                          errored++;
                        }
                      }
                      let desc = success > 0 ? `**Banned** \`${success}\` members` : 'Failed to ban any members';
                      if (errored > 0 && desc !== '**Failed** to ban any members') desc += `\nFailed to ban \`${errored}\` members`;
                      if (desc !== 'Failed to ban any members') desc += `\n**Out** of \`${ids.length}\` members`;
                      return message.edit( {
                        content: '',
                        embed: {
                            title: `${config.emotes.success} Massbanned Users`,
                            description: desc,
                            timestamp: new Date(),
                            fields: [
                              {
                                name: `Banned users`,
                                value: `\`\`\`\n${usersList.join('\n')}\`\`\``
                              }
                            ]
                          }});
                        },
                        options: {
                          description: 'Ban all the users who sent a specified message in the last 100 messages.'
                        }
                }
    ],
    options: {
        description: 'Ban a user',
        usage: 'ban [user] (reason)'
    }
})