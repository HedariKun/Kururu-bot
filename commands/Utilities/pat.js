let gifAPI = require("../API/getGif.js");

let {color} = require("../config.json");

let client = require("nekos.life");
let neko = new client();

module.exports = {
    name:"Pat",
    description: "uses to Pat someone <3",
    alias: ["Pats"],
    usage: "(person you want to Pat)",
    execute: async(msg, args) => {
        let memb = msg.mentions.members.first();
        if(!memb) return msg.reply("you will find love one day ;w;");

        let emb = {
            embed: {
                title: `${msg.author.username} Pats ${memb.user.username}`,
                color:color,
                image : {
                    url : ""
                }
            }
        }

        neko.getSFWPat()
        .then(res => {
            emb.embed.image.url = res.url;
            msg.channel.send(emb);
        });

    }
}