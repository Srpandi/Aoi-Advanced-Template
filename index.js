const {AoiClient, LoadCommands} = require('aoi.js');
const config = require('./Handler/Main/Config.js')

require('colors')

const client = new AoiClient({
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
        dbType: "KeyValue",
        securityKey: "a-32-characters-long-string-here"
    },
})

const loader = new LoadCommands(client);
loader.load(client.cmd, "./Handler/Commands/")

client.variables(require('./Handler/Main/Variables.js'), "main") // For general variables
client.variables({
    guild_cases: {}, // Object type variable, with which we save the cases with their information
    cases: 0 // Number of cases
}, "cases") // Unique to the case system

client.readyCommand({
    $if: "old",
    code: `
$log[
╭――――――――――――――――――――――――――――――――――――――――――――――――――――――――╮
    client: $username[$clientID]
    Owner: $username[$clientOwnerIDs]
    Ping: $pingms
    $if[${config.logs}==true]
client invite: https://discord.com/oauth2/authorize?client_id=$clientID&scope=bot&permissions=1099511627775
    $endif
                    Handler By: SrPandi
╰――――――――――――――――――――――――――――――――――――――――――――――――――――――――╯


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


// Custom Functions

client.functionManager.createFunction({ // It is used to comment your code
    name: "$c",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [ text ] = data.inside.splits;
        if (!text) return d.aoiError.fnError(d, 'custom', {}, 'No text provided');
        return {
        code: d.util.setCode(data)
    }
}
});
