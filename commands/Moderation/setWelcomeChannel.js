const dbConnection = require("../../mysql/mysql_controller");
const serversManger = require("../../mysql/serversManger");

module.exports = {
    name: "setWelcomeChannel",
    execute: async (msg, args) => {
        if(!msg.member.hasPermission("ADMINISTRATOR"))
            return msg.reply("you don't have permission");

        if(!args[0])
            return msg.reply("you need to provide a channel name");
        
        let channelName = args.map(w => w).join(" ");
        let c;
        for(let channel of msg.guild.channels){
            if(channel[1].name.toLowerCase() == channelName){
                c = channel[0];
            }
        }

        if(!c)
            return msg.reply("That channel doesn't exist");
        
        await dbConnection.changeServerValue(msg.guild.id,"WelcomeMessageChannel", c)
        .then(() => setTimeout(() => {serversManger.loadServers()}, 500));
        msg.reply(`the welcome channel has been changed to ${channelName}`);

    }
}