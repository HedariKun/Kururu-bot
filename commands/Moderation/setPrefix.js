const dbConnection = require("../../mysql/mysql_controller");
const serversManger = require("../../mysql/serversManger");

module.exports = {
     name: "setPrefix",
     description: "to set the bot prefix in the current server.",
     useage: "[new prefix]",
     execute: async (msg, args) => {
        if(!msg.member.hasPermission("ADMINISTRATOR"))
            return msg.reply("you don't have permission to do this command");
        if(!args[0])
            return msg.reply("please select a prefix");
        
        await dbConnection.changeServerValue(msg.guild.id,"prefix", args[0])
        .then(() => setTimeout(() => {serversManger.loadServers()}, 500));
        msg.reply(`the prefix changed to ${args[0]}`);
     }
}