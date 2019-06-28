[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e4d43041130a403ea6ea52400048f1eb)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Hector6704/Delta&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.com/Hector6704/Delta.svg?token=WgWmtscifLJBWxjKMBRq&branch=master)](https://travis-ci.com/Hector6704/Delta)

# Delta
![Hack Week Event](https://images-ext-1.discordapp.net/external/tfj720alwqFs_mZovQVpNZ0WWf6DRFbd5IHAxja8KdM/https/cdn-images-1.medium.com/max/1200/1%2Alh6NS8hx0pu5mlZeSqnu5w.jpeg)

Delta is a bot for advanced moderation, made for the Discord Hack Week Event. 
You can invite the hosted version [here](https://discordapp.com/api/oauth2/authorize?client_id=592765877217263639&permissions=0&scope=bot)
You can try it [here](https://discord.gg/YhJ3ng8)

## Creators
[Hector](https://github.com/Hector6704) and [Frosty](https://github.com/FrostedFrost).

## Features
- Advanced ban command: Ban multiples users (up to 30) with `/ban mass`. Ban all the users that send a specific message (in the last 100 messages) with `/ban match`. This is very useful if your server gets attacked by user bots. And obviously, you can also use the classic `/ban` command
- Lock your server/categories/channels with the lock command.

## How to install
1. Clone the repo: `git clone https://github.com/Hector6704/Delta`
3. Clone [config.template.json](https://github.com/Hector6704/Delta/blob/master/config.template.json) into the main directory and rename it to `config.json`
2. Install the dependencies: `npm install`
3. Start the bot: `node index.js`
