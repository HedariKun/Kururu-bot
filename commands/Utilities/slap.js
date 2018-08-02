let gifAPI = require("../API/getGif.js");

let {color} = require("../config.json");

let client = require("nekos.life");
let neko = new client();

module.exports = {
    name:"Slap",
    description: "uses to Slap someone",
    alias: ["Slaps"],
    usage: "(person you want to Slap)",
    execute: async(msg, args) => {
        let memb = msg.mentions.members.first();
        if(!memb) return msg.reply("choose your victim first");
        let emb = {
            embed: {
                title: `${msg.author.username} Slaps ${memb.user.username}`,
                color:color,
                image : {
                    url : ""
                }
            }
        }
        if(memb.user.id == msg.author.id){
            emb.embed.title = `${msg.author.username} Slaps himself how pathetic.`;
        }
        neko.getSFWSlap()
        .then(res => {
            emb.embed.image.url = res.url;
            msg.channel.send(emb);
        });

    }
}