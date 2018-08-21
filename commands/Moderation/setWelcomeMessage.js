const dbConnection = require("../../mysql/mysql_controller");
const serversManger = require("../../mysql/serversManger");

module.exports = {
    name: "setWelcomeMessage",
    execute: async (msg, args) => {
        if(!msg.member.hasPermission("ADMINISTRATOR"))
            return msg.reply("you don't have permission");

        if(!args[0])
            return msg.reply("you need to write a message as parameter");
        

        let message = args.map(w => w).join(" ");
        await dbConnection.changeServerValue(msg.guild.id,"welcomeMessage", message)
        .then(() => setTimeout(() => {serversManger.loadServers()}, 500));
        msg.reply("the welcome Message has been set successfully");
        
    }
}