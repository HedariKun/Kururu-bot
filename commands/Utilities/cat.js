const fetch = require("node-fetch");
const {color} = require("../config.json");

module.exports = {
    name:"cat",
    execute: async (msg) => {
        let emb = {
            embed: {
                color: color,
                title: "🐱, Nyan~",
                image: {
                    url : ""
                }
            }
        }
        let api;
        fetch("http://aws.random.cat/meow")
        .then(e => e.json())
        .then(j => {
            emb.embed.image.url = j.file;
            msg.channel.send(emb);
        })
        .catch(err => console.log(err));
    }
}