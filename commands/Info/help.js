const {color, prefix} = require("../config.json");

module.exports = {
    name : "help",
    execute(msg, args){
        let emb = {
            embed : {
                title: "Commands List",
                color: color,
                description: `The bot prefix is ${prefix}`,
                fileds: []
            }
        }
        
        let fields = [];

        msg.client.commandTypes.map(e => {
            let obj = {
                name: e,
                value: ""
            }

            msg.client.commands.map(c => {
                if(c.type == e){
                    obj.value += `${c.command.name} \n`
                }
            });

            if(e != "Owner")
            fields.push(obj);

        });

        emb.embed.fields = fields;
        msg.channel.send(emb);


    }
}