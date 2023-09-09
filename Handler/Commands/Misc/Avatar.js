module.exports = [{
    name: "avatar",
    aliases: ["av"],
    info: {
        usage: "avatar [user]",
        aliases: ["av"],
        description: "Show your avatar or that of another user",
        bot_permissions: ["sendmessages", "viewchannel", "embedlinks"],
    },
    $if: "old",
    code: `
$author[$userTag;$userAvatar]
$description[## $username[$findMember[$message[1]]] avatar]
$image[$userAvatar[$findMember[$message[1]]]]
$footer[Requested by $username]
$color[Random]

$addButton[1;Download;5;$nonEscape[$replaceText[$userAvatar[$findMember[$message[1]]];webp;png]]]

`
}]
