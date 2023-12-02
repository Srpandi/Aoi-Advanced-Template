module.exports = [{
    name: "view-case",
    aliases: ["viewcase", "case"],
    info: {
        usage: "view-case <case ID>",
        aliases: ["case"],
        description: "look at a specific case of a user by id",
        bot_permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    code: `
$author[$userTag[$get[mod]];$userAvatar[$get[mod]]]
$description[**User:** $userTag[$getObjectProperty[case;case_$message[1].user]] ($getObjectProperty[case;case_$message[1].user])
**Action:** $getObjectProperty[case;case_$message[1].action]
**Reason:** $getObjectProperty[case;case_$message[1].reason]
**Deleted?:** $getObjectProperty[case;case_$message[1].deleted]
]
$color[$replaceText[$getObjectProperty[case;case_$message[1].action];warn;FFC005]]
$footer[Case #$message[1]]

$let[mod;$getObjectProperty[case;case_$message[1].mod]]

$onlyIf[$getObjectProperty[case;case_$message[1]]!=undefined||$getObjectProperty[case;case_$message[1]]!=;:x: There is no case registered with that ID]

$onlyIf[$message[1]>0;:x: There is no case registered with that ID]

$onlyIf[$message[1]<=$djsEval[let obj = $nonEscape[$getObject[case;true]]
Object.keys(obj).length;true];:x: There is no case registered with that ID]

$onlyIf[$isNumber[$message[1]]==true;:x: Provide a valid case]

$onlyIf[$getObject[case;false]!=;:x: There is no case to show]

$argsCheck[>;Missing arguments!
\`\`\`
view-case <case ID>
           ^^^^^^^
Enter a case to show
\`\`\`]

$createObject[case;$getGuildVar[guild_cases;$guildID;cases]]
`
}]
