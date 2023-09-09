module.exports = [{
    name: "ping",
    info: {
        usage: "ping",
        description: "Shows bot latency",
        bot_permissions: ["sendmessages", "viewchannel"],
    },
    code: `
🏓 Pong!
My latency is: \`$ping\`MS
`
}]