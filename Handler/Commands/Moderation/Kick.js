module.exports = [{
    name: "kick",
    info: {
        usage: "kick <usuario> [razon]",
        description: "Expulsa a un miembro del servidor",
        user_perms: ["Expulsar Miembros"],
        bot_perms: ["Ver Canales", "Enviar Mensajes", "Insertar Enlaces", "Expulsar Miembros"]
    },
    $if: "old",
    code: `
$if[$checkCondition[$channelExists[$getGuildVar[mod_log]]==true&&$getGuildVar[mod_logs]==true]==true]

$channelSendMessage[$getGuildVar[mod_log];{newEmbed:{description:**Miembro#COLON#** $username[$findMember[$message[1];false]] (\`$findMember[$message[1];false]\`)
**Accion#COLON#** Kick
**Razon#COLON#** $get[razon]
}{author:$username:$userAvatar}{color:e2581d}{footer:Case #$getGuildVar[guild_cases_count;$guildID;cases]}{timestamp}}]

$endif

$setGuildVar[guild_cases;$getObject[case;true];$guildID;cases]

$setObjectProperty[case;case_guild_$getGuildVar[guild_cases_count;$guildID;cases];{"mod": "$authorID", "user": "$findMember[$message[1];false]", "razon": "$replaceText[$get[razon];\n;]", "datestamp": "$dateStamp", "borrado": false, "accion": "kick"}]

$createObject[case;$getGuildVar[guild_cases;$guildID;cases]]


<:check_mark:1147386896415207466> <@$findMember[$message[1];false]> ha sido expulsado - \`Case #$getGuildVar[guild_cases_count;$guildID;cases]\`


$setGuildVar[guild_cases_count;$sum[$getGuildVar[guild_cases_count;$guildID;cases];1];$guildID;cases]


$kick[$guildID;$findMember[$message[1];false];$username - $get[razon]]


$let[razon;$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;No se proporcionó una razón];false;$messageSlice[1]]]

$onlyIf[$rolePosition[$userHighestRole[$findUser[$message[1];false];$guildID;id];$guildID]>$rolePosition[$userHighestRole[$clientId;$guildID;id];$guildID];{newEmbed:{description:<:no_check:1061371131149418516> El usuario tiene un rol igual o mayor al mio}{author:$username:$userAvatar}{color:ff2e2e}}]

$onlyIf[$rolePosition[$userHighestRole[$findUser[$message[1];false];$guildID;id];$guildID]>$rolePosition[$userHighestRole[$authorID;$guildID;id];$guildID];{newEmbed:{description:<:no_check:1061371131149418516> El usuario tiene un rol igual o mayor al tuyo}{author:$username:$userAvatar}{color:ff2e2e}}]

$onlyIf[$findMember[$message[1];false]!=$clientID;{newEmbed:{description:<:no_check:1061371131149418516> No puedo expulsarme a mi mismo}{color:ff2e2e}{author:$username:$userAvatar}}]

$onlyIf[$findMember[$message[1];false]!=$ownerID;{newEmbed:{description:<:no_check:1061371131149418516> No se puede expulsar al dueño del servidor}{color:ff2e2e}{author:$username:$userAvatar}}]

$onlyIf[$findMember[$message[1];false]!=$authorID;{newEmbed:{description:<:no_check:1061371131149418516> No puedes expulsarte a ti mismo}{color:ff2e2e}{author:$username:$userAvatar}}]

$onlyIf[$memberExists[$findMember[$message[1];false]]==true;{newEmbed:{description:<:no_check:1061371131149418516> Proporciona un usuario valido o existente}{author:$username:$userAvatar}{color:ff2e2e}}]

$argsCheck[>;{newEmbed:{description:<:no_check:1061371131149418516> Proporciona un usuario para poder expulsar del servidor}{color:ff2e2e}{author:$username:$userAvatar}}]

$disableMentionType[all]

$onlyIf[$hasAnyPerm[$guildID;$authorID;kickmembers;administrator]==true;{newEmbed:{description:<:no_check:1061371131149418516> Necesitas los permisos de \`Expulsar Miembros\`}{author:$username:$userAvatar}{color:ff2e2e}}]

$onlyIf[$hasAnyPerm[$guildID;$clientID;kickmembers;administrator]==true;{newEmbed:{description:<:no_check:1061371131149418516> Necesito los permisos de \`Expulsar Miembros\`}{author:$username:$userAvatar}{color:ff2e2e}}]
`
}]
