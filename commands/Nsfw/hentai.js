const {color} = require("../config.json");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    name:"hentai",
    description: "to get a random hentai pic",
    alias: ["porn"],
    execute(msg){
        if(!msg.channel.nsfw) return msg.reply("you need to be in NSFW channel for this command to work");

        let emb = {
            embed : {
                title: "Hentai",
                color: color,
                image: {
                    url : ""
                }
            }
        }

        neko.getNSFWHentai()
        .then(res => {
            emb.embed.image.url = res.url;
            msg.channel.send(emb);
        });


    }
}