const dbConnection = require("../../mysql/mysql_controller");
const serversManger = require("../../mysql/serversManger");

module.exports = {
    name: "setWelcomeImage",
    execute: async (msg, args) => {
        if(!msg.member.hasPermission("ADMINISTRATOR"))
            return msg.reply("you don't have permission");

        if(!args[0] || args[0].toLowerCase() != "on")
            if(args[0].toLowerCase() != "off")
                return msg.reply("you need to specific if you want to turn it ``on`` or ``off``");
        
        if(args[0].toLowerCase() == "on"){
            await dbConnection.changeServerValue(msg.guild.id,"welcomeMessageActive", 1)
            .then(() => setTimeout(() => {serversManger.loadServers()}, 500));
        }

        if(args[0].toLowerCase() == "off"){
            await dbConnection.changeServerValue(msg.guild.id,"welcomeMessageActive", 0)
            .then(() => setTimeout(() => {serversManger.loadServers()}, 500));
        }

        msg.reply(`the welcome Image has been set ${args[0]} successfully`);
        
    }
}