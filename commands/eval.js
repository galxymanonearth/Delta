const config = require('../config');
const util = require('util');

module.exports = bot => ({
    label: 'eval', 
    execute: async (msg, args) => {
      let evaled;
      try {
          evaled = await eval(args.join(' '));

          if (typeof evaled === 'object') {
              evaled = util.inspect(evaled, { depth: 0, showHidden: true });
          } else {
              evaled = String(evaled);
          }
      } catch (err) {
          return bot.createMessage(msg.channel.id, `\`\`\`js\n${err}\`\`\``);
      }

      evaled = evaled.replace(bot.token, 'no.');

      const fullLen = evaled.length;

      if (fullLen === 0) {
          return null;
      }

      if (fullLen > 2000) {
          evaled = evaled.match(/[\s\S]{1,1900}[\n\r]/g) || [];
          if (evaled.length > 3) {
              bot.createMessage(msg.channel.id, `\`\`\`js\n${evaled[0]}\`\`\``);
              bot.createMessage(msg.channel.id, `\`\`\`js\n${evaled[1]}\`\`\``);
              bot.createMessage(msg.channel.id, `\`\`\`js\n${evaled[2]}\`\`\``);
              return;
          }
          return evaled.forEach((message) => {
            bot.createMessage(msg.channel.id, `\`\`\`js\n${message}\`\`\``);
              return;
          });
      }
      return bot.createMessage(msg.channel.id, `\`\`\`js\n${evaled}\`\`\``);
  },
      options: {
        aliases: ['e'],
        hidden: true,
        requirements: {
          userIDs: config.ownersIDs
        }
    }})