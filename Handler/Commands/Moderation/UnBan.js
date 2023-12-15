module.exports = [{
    name: "un-ban",
    aliases: ['unban'],
    info: {
        usage: "un-ban <usuario> [razon]",
        description: "Desbanea a un usuario",
        user_perms: ["Banear Miembros"],
        bot_perms: ["Ver Canales", "Enviar Mensajes", "Insertar Enlaces", "Banear Miembros"]
    },
    $if: "old",
    code: `
$if[$checkCondition[$channelExists[$getGuildVar[mod_log]]==true&&$getGuildVar[mod_logs]==true]==true]

$channelSendMessage[$getGuildVar[mod_log];{newEmbed:{description:**Miembro#COLON#** $username[$findUser[$message[1];false]] (\`$findUser[$message[1];false]\`)
**Accion#COLON#** Unban
**Razon#COLON#** $get[razon]
}{author:$username:$userAvatar}{color:1dff80}{footer:Case #$getGuildVar[guild_cases_count]}{timestamp}}]

$endif

$setGuildVar[guild_cases;$getObject[case;true]]

$setObjectProperty[case;case_guild_$getGuildVar[guild_cases_count];{"mod": "$authorID", "user": "$findUser[$message[1];false]", "razon": "$replaceText[$get[razon];\n;]", "datestamp": "$dateStamp", "borrado": false, "accion": "unban"}]
    
$createObject[case;$getGuildVar[guild_cases]]

<:check_mark:1147386896415207466> <@$findUser[$message[1];false]> ha sido desbaneado - \`Case #$getGuildVar[guild_cases_count]\`

$setGuildVar[guild_cases_count;$sum[$getGuildVar[guild_cases_count];1]]

$unban[$guildID;$findUser[$message[1];false];$username - $get[razon]]

$let[razon;$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;No se proporcionó una razón];false;$messageSlice[1]]]

$onlyIf[$isBanned[$guildID;$findUser[$message[1];false]]==true;{newEmbed:{description:<:no_check:1061371131149418516> El usuario que proporcionaste no se encuentra baneado}{author:$username:$userAvatar}{color:ff2e2e}}]

$disableMentionType[all]

$onlyIf[$userExists[$findUser[$message[1];false]]==true;{newEmbed:{description:<:no_check:1061371131149418516> Proporciona un usuario valido o existente}{color:ff2e2e}{author:$username:$userAvatar}}]

$argsCheck[>;{newEmbed:{description:<:no_check:1061371131149418516> Proporciona un usuario para desbanear}{color:ff2e2e}{author:$username:$userAvatar}}]

$onlyIf[$hasAnyPerm[$guildId;$authorId;banmembers;administrator]==true;{newEmbed:{description:<:no_check:1061371131149418516> Necesitas los permisos de \`Banear Miembros\`}{color:ff2e2e}{author:$username:$userAvatar}}]

$onlyIf[$hasAnyPerm[$guildId;$clientId;banmembers;administrator]==true;{newEmbed:{description:<:no_check:1061371131149418516> Necesito los permisos de \`Banear Miembros\`}{color:ff2e2e}{author:$username:$userAvatar}}]
`
}]
