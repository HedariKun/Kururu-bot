let UsedCommands = [];

module.exports = {
    onMessage: async (msg, prefix, client) => {
        if(msg.mentions.users.first() == client.user && msg.content.startsWith("<")){
            msg.reply(`the bot's prefix is ${prefix} \n do ${prefix}help for the commands list.`);
        }
    
        if(msg.author.bot || !msg.content.startsWith(prefix)) return;
        
        let args = msg.content.split(" ");
        let commandName = args.shift().slice(1).toLowerCase();
        let command;
    
        if(commandName.startsWith(prefix) || commandName == "") return;
        
        if(client.commands.has(commandName)){
            command = client.commands.get(commandName).command;
        } else {
            client.commands.map(e => {
                if(!e.command.alias) return;
                for(let i = 0; i < e.command.alias.length; i++){
                    if(e.command.alias[i].toLowerCase() == commandName){
                        command = e.command;
                    }
                }
            });
        }
    
        if(command){
            try {
                let canUse = true;
                let found = false;
                for(let u of UsedCommands){
                    if(u.userID == msg.author.id){
                        found = true;
                        if(u.count < 10){
                            u.count++;
                            u.timer = 60;
                        } else {
                            canUse = false;
                            msg.reply(`you need to wait ${u.timer} sec before you can use commands again!`);
                        }
                    } 
                }
                if(!found) {
                    let obj = {
                        userID: msg.author.id,
                        count: 1,
                        timer: 60
                    }
    
                    UsedCommands.push(obj);
    
                }
                if(canUse)
                    command.execute(msg, args);
                
            } catch (err) {
                console.log(err);
            }
        } else {
            if(!msg.channel) return;
    
            let m = await msg.channel.send("that command doesn't exist");
            setTimeout(() => {m.delete()}, 3000);
        }
    
    }
}

module.exports.UsedCommands = UsedCommands;