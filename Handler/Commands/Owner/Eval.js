module.exports = [{
    name: "eval",
    aliases: ["e"],
    info: {
        usage: "eval <code> [--djs | --discord.js]",
        aliases: ["e"],
        description: "Evaluate code from Aoi.js and Discord.js, use --djs or --discord.js if you want it to evaluate the code with discord.js",
        bot_permissions: ["all"],
        user_permissions: ["onlyBotOwner"]
    },
    $if: "old",
    code: `
$if[$checkContains[$message;--djs;--discord.js]==true]

$djsEval[$removeContains[$message;--djs;--discord.js]]

$else

$eval[$message]

$endif

$onlyIf[$authorID==$clientOwnerIDs;]

`
}]
