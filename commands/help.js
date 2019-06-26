module.exports = bot => ({
    label: 'help',
    execute: async (msg, args) => {
            if (!args[0]) {
                let commands = Object.values(bot.commands)
                let unhidden = commands.filter(a => !a.hidden)
                let cmdList = []
                for (const cmdArray of unhidden) {
                    cmdList.push(`**${msg.prefix}${cmdArray.label}** - ${cmdArray.description}`)
                }
                bot.createMessage(msg.channel.id, {
                    embed:{
                        title: 'Commands List',
                        description: cmdList.join('\n'),
                        timestamp: new Date(msg.createdAt),
                        footer: {
                            text: `Bot ID: ${bot.user.id} | Server ID: ${msg.channel.guild.id}`,
                            icon_url: msg.channel.guild.iconURL
                        }
                    }
                })
            } else {
            if (!bot.commands[args[0].toLowerCase()]) {
                return bot.createMessage(msg.channel.id, `${config.emotes.error} Command not found, use \`${msg.prefix}help\` to get a list of commands.`);
            }
            const command = bot.commands[args[0].toLowerCase()];
            const subcommands = Object.values(command.subcommands);
            const fields = [];
            const mess = {
                title: `Help for ${msg.prefix}${command.label}`,
                description: `**Name:** ${command.label}`,
            }
            if (command.description) {
                mess.description += `\n**Description:** ${command.description}`;
            }
            if (command.usage) {
                mess.description += `\n**Usage:** \`${msg.prefix}${command.usage}\``;
            }
            if (command.aliases.length > 0) {
                let aliases = []
                for (let alias of command.aliases) {
                    aliases.push(`\`${alias}\``)
                }
                fields.push({ name: aliases.length > 1 ? 'Aliases' : 'Alias',
                value: aliases.join(', ') })
            }
            if (subcommands.length > 0) {
                const finale = { name: 'Subcommands', value: [] };
                for (let subcmd of subcommands) {
                    const cur = `\`${msg.prefix}${command.label} ${subcmd.name}\` - ${subcmd.description}`;
                    finale.value.push(cur);
                }
                finale.value = finale.value.join('\n');
                fields.push(finale);
            }
            if (fields.length > 0) {
                mess.fields = fields;
            }
            return bot.createMessage(msg.channel.id, {
                embed: mess
            });
        }},
    options: {
        description: 'This help text',
        usage: 'help (command)',
        hidden: true
    }
})