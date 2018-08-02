let gifAPI = require("../API/getGif.js");


module.exports = {
    name:"kiss",
    execute: async(msg, args) => {
        let p = await gifAPI.get("anime_kiss");
        if(!p) return msg.reply("couldn't find the kiss sorry ;-;");
        else msg.reply(p);
    }
}