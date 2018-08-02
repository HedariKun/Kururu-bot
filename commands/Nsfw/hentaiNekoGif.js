const {color} = require("../config.json");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    name:"hentaiNekoGif",
    description: "to get a random Hentai Neko Gif",
    alias: ["hng"],
    execute(msg){
        if(!msg.channel.nsfw) return msg.reply("you need to be in NSFW channel for this command to work");

        let emb = {
            embed : {
                title: "Neko Hentai - Gif",
                color: color,
                image: {
                    url : ""
                }
            }
        }

        neko.getNSFWNekoGif()
        .then(res => {
            emb.embed.image.url = res.url;
            msg.channel.send(emb);
        });


    }
}