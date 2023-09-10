# Aoi Advanced Template
- Advanced template for your discord bot

## Content
- [Required packages](#this-template-uses-the-packages)
- [Features](#features)
- [Firs steps](#first-steps)

[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/invite/HMUfMXDQsV) [![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/CWkDtYT8py)

## This template uses the packages
- [aoi.js](https://www.npmjs.com/package/aoi.js)
- [@akarui/aoi.db](https://www.npmjs.com/package/@akarui/aoi.db)

## Features
This template contains:
- Advanced moderation system.
  - Case system
  - Warn command
- Various commands
  - Ping command
  - Avatar command
  - Advanced help command
- Multi-server prefix

**More on the way!**

## First steps
To start you must create a new application in [Discord Developer Portal] and obtain the token of your bot, make sure you have all Privileged Gateway Intents enabled. (*reference image*)

[![image](https://media.discordapp.net/attachments/1006970702819246222/1150223556211376138/Gateway.png?width=842&height=468)](https://media.discordapp.net/attachments/1006970702819246222/1150223556211376138/Gateway.png?width=842&height=468)

Now, with your bot's token, go to the `config.js` file (*You can find it in `./Handler/Main/Config.js`*) once inside replace "`YOUR TOKEN HERE`" with your bot's token bot

[![image](https://media.discordapp.net/attachments/1006970702819246222/1150225611978182716/Config2.png?width=1025&height=61)](https://media.discordapp.net/attachments/1006970702819246222/1150225611978182716/Config2.png?width=1025&height=61)

Once your token has been correctly placed, you must invite your bot to your server, for that you can go to [Permissions Calculator](https://discordapi.com/permissions.html#1099511627775) a page where you can choose the permissions of your bot and invite it (*Follow the instructions it asks for*)
Once you invited your bot, you have to turn it on. There are several ways to do this.
- From Visual Studio Code: 

Press the keys `control + shift + B ` (*This may be different*)
In the terminal put:
```
node .
or
node index.js
```
- From Replit:

There should be a green button that says '`Run`', press it and if you did all the steps correctly your bot will turn on.
