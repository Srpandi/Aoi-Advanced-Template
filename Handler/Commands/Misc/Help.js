module.exports = [{
    name: "help",
    aliases: ["command", "cmd", "h"],
    info: {
        usage: "help [command]",
        aliases: ["command", "cmd", "h"],
        description: "Look at information about the bot or a specific command",
        bot_permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    $if: "old",
    code: `
$if[$checkCondition[$message==||$commandInfo[$message;name]==||$commandInfo[$message;name]==undefined||$commandInfo[$message;info]==||$commandInfo[$message;info]==undefined]==true]

$author[$username[$clientID] Help;$userAvatar[$clientID]]
$description[
Hello **$username**! Welcome to the **$username[$clientID]** help panel.

**Help command:**
\`$getGuildVar[prefix]help [command]\`

**My owner:**
\`$username[$clientOwnerIDs]\` (\`$clientOwnerIDs\`)

**Ping:**
- Latency: \`$ping\`MS
- Message Latency: \`$messagePing\`MS
- Database Ping: \`$databasePing\`MS

**Commands:**
\`$commandsCount\`
]
$thumbnail[$replaceText[$replaceText[$checkCondition[$guildIcon==];true;$userAvatar[$clientID]];false;$guildIcon]]
$color[FEC3AC]

$elseif[$checkCondition[$message!=||$commandInfo[$message;name]!=||$commandInfo[$message;name]!=undefined||$commandInfo[$message;info]!=||$commandInfo[$message;info]!=undefined]==true]

$author[$toLocaleUpperCase[$commandInfo[$message;name]] Command;$userAvatar[$clientID]]
$description[$commandInfo[$message;info.description]]
$addField[User permissions:;\`$replaceText[$replaceText[$checkCondition[$commandInfo[$message;info.user_permissions]==||$commandInfo[$message;info.user_permissions]==undefined];true;No permissions required];false;$replaceText[$commandInfo[$message;info.user_permissions];,;\`, \`]]\`]
$addField[Bot permissions:;\`$replaceText[$replaceText[$checkCondition[$commandInfo[$message;info.bot_permissions]==||$commandInfo[$message;info.bot_permissions]==undefined];true;No permissions required];false;$replaceText[$commandInfo[$message;info.bot_permissions];,;\`, \`]]\`]
$addField[Aliases:;\`$replaceText[$replaceText[$checkCondition[$commandinfo[$message;aliases]==||$commandinfo[$message;aliases]==undefined];true;No aliases to show];false;$replaceText[$commandInfo[$message;info.aliases];,;\`, \`]]\`]
$addField[Usage:;\`$getGuildVar[prefix]$commandInfo[$message;info.usage]\`]
$color[Random]

$endelseif
$endif
`
}]
