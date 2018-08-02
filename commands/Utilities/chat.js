const client = require("nekos.life");
const neko = new client();

module.exports = {
    name : "chat",
    execute: async (msg, args) => {
        if(!args[0]) return msg.reply("please say something ");
        let res = await neko.getSFWChat({text: args.map(e => e).join(" ")});
        msg.channel.send(res.response);
    }
}