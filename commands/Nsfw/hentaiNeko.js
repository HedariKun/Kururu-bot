const {color} = require("../config.json");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    name:"hentaiNeko",
    description: "to get a random Hentai Neko pic",
    alias: ["hn"],
    execute(msg){
        if(!msg.channel.nsfw) return msg.reply("you need to be in NSFW channel for this command to work");

        let emb = {
            embed : {
                title: "Neko Hentai",
                color: color,
                image: {
                    url : ""
                }
            }
        }

        neko.getNSFWNeko()
        .then(res => {
            emb.embed.image.url = res.url;
            msg.channel.send(emb);
        });


    }
}