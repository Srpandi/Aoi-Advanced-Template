module.exports = [{
    name: "set-prefix",
    aliases: ["prefix", "setprefix"],
    info: {
        usage: "set-prefix <newPrefix>",
        aliases: ["prefix"],
        description: "Set a new prefix for your server",
        user_permissions: ["administrator", "manageguild"],
        bot_permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    code: `
$setGuildVar[prefix;$message[1]]

Server prefix changed!
New prefix: \`$message[1]\`

$onlyIf[$emojisFromMessage==;:x: The prefix cannot contain emojis]

$onlyIf[$isUnicodeEmoji[$message[1]]==false;:x: The prefix cannot contain emojis]

$onlyIf[$isCustomEmoji[$message[1];$guildID]==false;:x: The prefix cannot contain custom emojis]

$onlyIf[$charCount[$message[1]]<=4;:x: The prefix can't have more than 4 arguments]

$argsCheck[>;Missing arguments!
\`\`\`
set-prefix <newPrefix>
            ^^^^^^^^^
Enter a new prefix for the server
\`\`\`
]

$onlyIf[$hasAnyPerm[$guildID;$authorID;manageguild;administrator]==true;You need \`Manage Guild\` permissions]
`
}]