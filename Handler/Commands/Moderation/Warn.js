module.exports = [{
    name: "warn",
    aliases: ["w"],
    info: {
        usage: "warn <user> [reason]",
        aliases: ["w"],
        description: "Warns a user if they have broken the rules",
        user_permissions: ["kickmembers", "administrator", "manageguild", "manageroles"],
        bot_permissions: ["sendmessages", "viewchannel", "embedlinks", "manageroles"]
    },
    $if: "old",
    code: `
$setGuildVar[guild_cases;$getObject[case;true];$guildId;cases]


$setObjectProperty[case;case_$getGuildVar[cases;$guildID;cases];{"mod": "$authorID", "user": "$findMember[$message[1];false]", "reason": "$replaceText[$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;No reason provided];false;$messageSlice[1]];\n;]", "datestamp": "$dateStamp", "deleted": false, "action": "warn"}]


:white_check_mark: \`Case #$getGuildVar[cases;$guildID;cases]\` <@$findMember[$message[1];false]> has been warned

$createObject[case;$getGuildVar[guild_cases;$guildID;cases]]


$setGuildVar[cases;$sum[$getGuildVar[cases;$guildID;cases];1];$guildID;cases]


$onlyIf[$findMember[$message[1];false]!=$ownerID;:x: I can't warn the server owner!]

$onlyIf[$findMember[$message[1];false]!=$authorID;:x: You can't warn yourself]

$onlyIf[$isBot[$findMember[$message[1];false]]==false;:x: I can only warn users!]

$onlyIf[$rolePosition[$userHighestRole[$findMember[$message[1];false]];$guildID]>$rolePosition[$userHighestRole[$clientID];$guildID];:x: This user has a role equal to or greater than me.]

$if[$authorID!=$ownerID]

$onlyIf[$rolePosition[$userHighestRole[$findMember[$message[1];false]];$guildID]>$rolePosition[$userHighestRole[$authorID];$guildID];:x: This user has a role equal to or greater than you.]

$endIf

$onlyIf[$memberExists[$findMember[$message[1];false]]==true;:x: Provide a valid user!]

$argsCheck[>;Missing arguments!
\`\`\`
warn <user> [reason]
      ^^^^
Provides a user to warn
\`\`\`
]

$onlyIf[$hasAnyPerm[$guildID;$authorID;manageroles;manageguild;administrator;kickmembers]==true;:x: I need \`Manage Roles\` permissions]

$onlyIf[$hasAnyPerm[$guildID;$clientID;manageroles;manageguild;administrator;kickmembers]==true;:x: You need \`Kick Members\` or \`Manage Roles\` permissions]

$disableMentionType[all]
`
}]
