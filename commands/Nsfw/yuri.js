const {color} = require("../config.json");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    name:"yuri",
    description: "to get a random yuri pic",
    alias: ["lesbian"],
    execute(msg){
        if(!msg.channel.nsfw) return msg.reply("you need to be in NSFW channel for this command to work");

        let emb = {
            embed : {
                title: "Yuri",
                color: color,
                image: {
                    url : ""
                }
            }
        }

        neko.getNSFWYuri()
        .then(res => {
            emb.embed.image.url = res.url;
            msg.channel.send(emb);
        });


    }
}