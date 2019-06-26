module.exports = bot => ({
    label: 'ping',
    execute: async(msg) => {
        const then = Date.now();
        const newmsg = await msg.channel.createMessage('Pong!');
        const diff = Date.now() - then;
        await newmsg.edit(`Pong! \`${diff}ms\``);
    },
    options: { 
        description : 'Pings the bot',
        usage: 'ping'
    }
})