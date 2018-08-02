const APIUrl = "http://api.urbandictionary.com/v0/define?term=";
const fetch = require("node-fetch");
const {color} = require("../config.json");

module.exports = {
    name: "urban",
    execute: async(msg, args) => {
        if(!args[0]) return msg.reply("you need to insert a key word!");
        fetch(APIUrl+args[0])
        .then(e => e.json())
        .then(j => {
            if(j.list.length == 0) return msg.reply("couldn't find a definition for that word.");
            let emb = {
                embed : {
                    title: `Definition of ${args[0]}`,
                    color: color,
                    fields: [
                        {
                            name: "Definition 1",
                            value: j.list[0].definition
                        },
                        {
                            name: "Definition 2",
                            value: j.list[1].definition
                        },
                        {
                            name: "Example 1",
                            value: j.list[0].example
                        },
                        {
                            name: "Example 2",
                            value: j.list[1].example
                        }
                    ],
                    footer : {
                        text: "powered by UrbanDictionary API"
                    }
                }
            }

            msg.channel.send(emb);

        });

    }
}