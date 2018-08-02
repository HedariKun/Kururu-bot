const {color} = require("../config.json");

module.exports = {
    name: "ping",
    execute: async (msg) => {
        let emb = {
            embed:{
                color: color,
                title: "Ping?"
            }
        }
        const m = await msg.channel.send(emb);
        emb.embed.title = `Pong! \n took ${m.createdTimestamp - msg.createdTimestamp}ms`;
        m.delete();
        msg.channel.send(emb);

    }
}