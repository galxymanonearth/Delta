const bot = require('./bot.js');
const config = require('./config.json');
const util = require('util');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

process.on('uncaughtException', (err) => {
  console.error(err);
  bot.executeWebhook('592768515199467550', '8MAad-Hf8Bjfd1gyC1q5u0Ym6Talruh34gvy2q1qaYTvqkovzs9J_ht30jqln3-g9dB7', {
    content: `\`\`\`sh\n${err}\n\`\`\``
  })
});

process.on('unhandledRejection', (err) => {
  console.error(err.stack);
  bot.executeWebhook('592768515199467550', '8MAad-Hf8Bjfd1gyC1q5u0Ym6Talruh34gvy2q1qaYTvqkovzs9J_ht30jqln3-g9dB7', {
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
            cmd.registerSubcommand(subcmd.name, subcmd.execute, subcmd.options)
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
