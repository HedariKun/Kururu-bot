const {color, prefix} = require("../config.json");

module.exports = {
    name : "help",
    execute(msg, args){
        let emb = {
            embed : {
                title: "Commands List",
                color: color,
                description: `The bot prefix is ${prefix} \n you can do ${prefix}help [Command Name] for more information about that command`,
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
        if(!args[0])
            msg.channel.send(emb);
        else {
            let com = msg.client.commands.get(args[0]);
            if(!com) return msg.reply("that command doesn't exist");

            emb.embed.title = com.command.name;
            emb.embed.description = com.command.description || "";
            emb.embed.fields = [];
            if(com.command.usage){
                let obj = {
                    name: "Usage",
                    value: `${prefix}${com.command.name} ${com.command.usage}`
                }
                emb.embed.fields.push(obj);
            }
            if(com.command.alias){
                let obj = {
                    name: "Alias",
                    value: com.command.alias.map(e => e).join(", ")
                }
                emb.embed.fields.push(obj);
            }

            msg.channel.send(emb);
        }

    }
}