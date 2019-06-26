const bot = require('../bot');
const config = require('../config');
const util = require('util');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

process.on('uncaughtException', (err) => {
  console.error(err);
  bot.executeWebhook(config.webhooks.logs.ID, config.webhooks.logs.token, {
    content: `\`\`\`sh\n${err}\n\`\`\``
  })
});

process.on('unhandledRejection', (err) => {
  console.error(err.stack);
  bot.executeWebhook(config.webhooks.logs.ID, config.webhooks.logs.token, {
    content: `\`\`\`sh\n${err}\n\`\`\``
  })
});

function read() {
  fs.readdir(path.join(__dirname, `./commands/`), (err, files) => {
    if (err) console.error(err);
      files.forEach(file => {
      const command = require(`./commands/${file}`)(bot);
      let cmd = bot.registerCommand(command.label, command.execute, command.options);
      console.log(chalk.blue(`[LOAD] - Loaded ${command.label}`));
      if (command.subcommands)  {
        for (let subcmd of command.subcommands) { 
            cmd.registerSubcommand(subcmd.label, subcmd.execute, subcmd.options)
        }}
    });
  });
}
console.log(chalk.magenta('[LOAD] - Loading Commands...'));
read();

fs.readdir(__dirname + '/events/', (err, files) => {
  console.log(chalk.magenta('[LOAD] - Loading Events...'));
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    bot.on(eventName, event.bind(null, bot));
    console.log(chalk.blue(`[LOAD] -  Loaded ${eventName}`));
  });
});
bot.connect();

const mongoose = require('mongoose');
mongoose.connect(config.mongoDBURL, {
  autoReconnect: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('open', () => console.log(chalk.green('[SYSTEM] - Connected to MongoDB')) );
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
