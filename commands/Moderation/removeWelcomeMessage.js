const dbConnection = require("../../mysql/mysql_controller");
const serversManger = require("../../mysql/serversManger");

module.exports = {
    name: "removeWelcomeMessage",
    execute: async (msg, args) => {
        if(!msg.member.hasPermission("ADMINISTRATOR"))
            return msg.reply("you don't have permission");

        await dbConnection.changeServerValue(msg.guild.id,"welcomeMessage", "")
        .then(() => setTimeout(() => {serversManger.loadServers()}, 500));
        msg.reply("the welcome Message has been removed successfully");
        
    }
}