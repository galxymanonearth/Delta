const config = require('../../config');
const { exec } = require('child_process');
const util = require('util');

const outputErr = (msg, stdData) => {
  const { stdout, stderr } = stdData;
  const message = stdout.concat(`\`\`\`${stderr}\`\`\``);
  msg.edit(message);
};

const doExec = (cmd, opts = {}) => {
  return new Promise((resolve, reject) => {
    exec(cmd, opts, (err, stdout, stderr) => {
      if (err) return reject({ stdout, stderr });
      resolve(stdout);
    });
  });
};

module.exports = bot => ({
    label: 'exec',
    execute: async(msg, args) => {
    const command = args.join(' ');
    const outMessage = await msg.channel.createMessage(`Executing \`${command}\`...`);
    let stdOut = await doExec(command).catch(data=> outputErr(outMessage, data));
    stdOut = stdOut.substring(0, 1750);
    outMessage.edit(`\`\`\`bash\n${stdOut}\n\`\`\``);
}, 
options: {
    aliases: ['ex'],
    hidden: true,
    requirements: {
      userIDs: config.ownersIDs
    }
}})
