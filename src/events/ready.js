const chalk = require('chalk');
const config = require('../../config')
module.exports = bot => {
  bot.editStatus('online', {name: 'Other bots of the Hack Week Event', type: 3});
  console.log(chalk.green('[SYSTEM] - Connected to Discord'));
  bot.executeWebhook(config.webhooks.logs.ID, config.webhooks.logs.token, {
    embeds: [{
      timestamp: new Date(bot.startTime),
      thumbnail: {
        url: bot.user.avatarURL
      },
      fields: [
        {
          name: 'Event',
          value: 'Ready',
          inline: true
        },
        {
          name: 'Users',
          value: `${bot.users.size}`,
          inline: true
        },
        {
          name: 'Guilds',
          value: `${bot.guilds.size}`
        }
      ],
      footer: {
        url: bot.avatarURL,
        text: `${bot.user.username} | Bot ID: ${bot.user.id} | Started`
      }
    }
  ]})
}
