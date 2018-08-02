const {color} = require("../config.json");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    name:"Trap",
    description: "to get a random Trap pic",
    execute(msg){
        if(!msg.channel.nsfw) return msg.reply("you need to be in NSFW channel for this command to work");

        let emb = {
            embed : {
                title: "Trap",
                color: color,
                image: {
                    url : ""
                }
            }
        }

        neko.getNSFWTrap()
        .then(res => {
            emb.embed.image.url = res.url;
            msg.channel.send(emb);
        });


    }
}