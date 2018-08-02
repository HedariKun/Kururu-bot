const {color} = require("../config.json");

const clinet = require("nekos.life");
const neko = new clinet();

module.exports = {
    name:"neko",
    execute: async (msg, args) => {
        let emb = {
            embed :{
                title: "Neko~",
                color: color,
                image: {
                    url: ""
                }
            }
        }

        neko.getSFWNeko().then(i => {
            emb.embed.image.url = i.url;
            msg.channel.send(emb);
        });

    }
}