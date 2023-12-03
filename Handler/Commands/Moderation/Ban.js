module.exports = [{
    name: "ban",
    aliases: ["b"],
    info: {
        usage: "ban <user> [messageHistoryDelete] [reason]",
        aliases: ["b"],
        description: "Ban a user from the server, even if they are not on it using their ID",
        user_permissions: ["administrator", "banmembers"],
        bot_permissions: ["sendmessages", "viewchannel", "embedlinks", "banmembers"]
    },
    $if: "old",
    code: `
$setGuildVar[guild_cases;$getObject[case;true];$guildId;cases]


$setObjectProperty[case;case_$getGuildVar[cases;$guildID;cases];{"mod": "$authorID", "user": "$findUser[$message[1];false]", "reason": "$replaceText[$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;No reason provided];false;$messageSlice[1]];\n;]", "datestamp": "$dateStamp", "deleted": false, "action": "ban"}]


:white_check_mark: \`Case #$getGuildVar[cases;$guildID;cases]\` <@$findUser[$message[1];false]> has been banned

$createObject[case;$getGuildVar[guild_cases;$guildID;cases]]


$if[$isNumber[$message[2]]==true]

$ban[$guildID;$findUser[$message[1];false];$message[2];$userTag - $messageSlice[2]]

$onlyIf[$message[2]<=7;:x: The maximum number of days is 7.]

$onlyIf[$message[2]>0;:x: The minimum number of days is 1]

$else

$ban[$guildID;$findUser[$message[1];false];7;$userTag - $messageSlice[1]]

$endif

$setGuildVar[cases;$sum[$getGuildVar[cases;$guildID;cases];1];$guildID;cases]


$onlyIf[$findUser[$message[1];false]!=$ownerID;:x: I can't ban the server owner!]

$onlyIf[$findUser[$message[1];false]!=$authorID;:x: You can't ban yourself]

$onlyIf[$isBot[$findUser[$message[1];false]]==false;:x: I can only ban users!]

$if[$memberExists[$findUser[$message[1]]]==true]

$onlyIf[$rolePosition[$userHighestRole[$findUser[$message[1];false]];$guildID]>$rolePosition[$userHighestRole[$clientID];$guildID];:x: This user has a role equal to or greater than me.]

$endIf

$if[$authorID!=$ownerID&&$memberExists[$findUser[$message[1]]]==true]

$onlyIf[$rolePosition[$userHighestRole[$findUser[$message[1];false]];$guildID]>$rolePosition[$userHighestRole[$authorID];$guildID];:x: This user has a role equal to or greater than you.]

$endIf

$onlyIf[$userExists[$findUser[$message[1];false]]==true;:x: Provide a valid user!]

$argsCheck[>;Missing arguments!
\`\`\`
ban <user> [messageHistoryDelete] [reason]
     ^^^^
Provides a user to ban
\`\`\`
]

$onlyIf[$hasAnyPerm[$guildID;$authorID;banmembers;administrator]==true;:x: I need \`Ban Members\` permissions]

$onlyIf[$hasAnyPerm[$guildID;$clientID;banmembers;administrator]==true;:x: You need \`Ban Members\` permissions]

$disableMentionType[all]
`
}]
