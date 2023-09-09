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

bot.variables(require('./Handler/Main/Variables.js'), "main")
bot.variables(require('./Handler/Main/Cases_Vars.js'), "cases") // Unique to the case system

bot.readyCommand({
    code: `
$log[
    ₊°︶︶︶︶︶︶︶︶︶︶︶︶︶ ‧₊˚
    Bot: $username[$clientID]
    Owner: $username[$clientOwnerIDs]
    Ping: $pingms
    Invite me: "Invite your bot here"

        Handler By: SrPandi
    ━━━━━━━━━━ ◦ ❖ ◦ ━━━━━━━━━━
]
`
})