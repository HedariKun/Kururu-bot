let gifAPI = require("../API/getGif.js");

let {color} = require("../config.json");

let client = require("nekos.life");
let neko = new client();

module.exports = {
    name:"kiss",
    description: "uses to kiss someone <3",
    alias: ["kisses"],
    usage: "(person you want to kiss)",
    execute: async(msg, args) => {
        let memb = msg.mentions.members.first();
        if(!memb) return msg.reply("you will find love one day ;w;");
        if(memb.user.id == msg.author.id) return msg.reply("so you isolated, how sad ;^;");
        let emb = {
            embed: {
                title: `${msg.author.username} kisses ${memb.user.username}`,
                color:color,
                image : {
                    url : ""
                }
            }
        }

        neko.getSFWKiss()
        .then(res => {
            emb.embed.image.url = res.url;
            msg.channel.send(emb);
        });

    }
}