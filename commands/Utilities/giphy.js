const gifAPI = require("../../handlers/getGif");
const {imageEmbed} = require("../../handlers/imageEmbed");

module.exports = {
    name:"gif",
    execute: async(msg, args) => {
        let tag = args.map(e => e).join(" ") || "anime";
        tag == " " ? "anime" : tag;
        
        let g = await gifAPI.get(tag);
        if(!g) return msg.reply("couldn't find the gif");

        msg.channel.send(imageEmbed(`Gif - ${tag}`, g));
    }
}