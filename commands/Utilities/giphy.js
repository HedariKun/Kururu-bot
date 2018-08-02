let gifAPI = require("../API/getGif.js");
const {color} = require("../config.json");

module.exports = {
    name:"gif",
    execute: async(msg, args) => {
        let tag = args.map(e => e).join(" ") || "anime";
        tag == " " ? "anime" : tag;
        
        let emb = {
            embed : {
                color:color,
                title: `Gif - ${tag}`,
                image: {
                    url : ""
                }
            }
        }

        let g = await gifAPI.get(tag);
        if(!g) return msg.reply("couldn't find the gif");
        emb.embed.image.url = g;
        msg.channel.send(emb);
    }
}