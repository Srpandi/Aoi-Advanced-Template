const {AoiClient, LoadCommands} = require('aoi.js');
const config = require('./Handler/Main/Config.js')

const bot = new AoiClient({
    token: config.token,
    prefix: ["$getGuildVar[prefix]", "<@$clientID>", "<@!$clientID>"],
    intents: ["MessageContent", "Guilds", "GuildMessages"],
    events: ["onMessage", "onInteractionCreate"],
    disableFunctions: ["$clientToken"],
    aoiWarning: false,
    aoiLogs: false,
    database: {
        type: "aoi.db",
        db: require('@akarui/aoi.db'),
        tables: ["main", "cases"],
        path: "./database/",
        extraOptions: {
            dbType: "KeyValue",
        },
    },
})

const loader = new LoadCommands(bot);
loader.load(bot.cmd, "./Handler/Commands/")

bot.variables(require('./Handler/Main/Variables.js'), "main") // For general variables
bot.variables({
    guild_cases: {}, // Object type variable, with which we save the cases with their information
    case: 0 // Number of cases
}, "cases") // Unique to the case system

bot.readyCommand({
    $if: "old",
    code: `
$log[
    ₊°︶︶︶︶︶︶︶︶︶︶︶︶︶ ‧₊˚
    Bot: $username[$clientID]
    Owner: $username[$clientOwnerIDs]
    Ping: $pingms
    $if[${config.logs}==true]
Bot invite: https://discord.com/oauth2/authorize?client_id=$clientID&scope=bot&permissions=1099511627775
    $endif
        Handler By: SrPandi
    ━━━━━━━━━━ ◦ ❖ ◦ ━━━━━━━━━━


]
`
})

/* [{ REPLIT }] */

if (config.replit.replit === true) {
  const express = require('express')
  const app = express()

  app.get('/', function(req, res) {
    res.send('Hello World')
  })

  app.listen(config.replit.port, () => {
    if (config.logs === true) {
      console.log(`Connection was established correctly with port ${config.replit.port}`)
    }
  })
}
