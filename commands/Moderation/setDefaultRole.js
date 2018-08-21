const dbConnection = require("../../mysql/mysql_controller");
const serversManger = require("../../mysql/serversManger");

module.exports = {
    name: "setDefaultRole",
    execute: async (msg, args) => {
        if(!msg.member.hasPermission("ADMINISTRATOR"))
            return msg.reply("you don't have permission");

        if(!args[0])
            return msg.reply("you need to provide a role name");
        
        let roleName = args.map(w => w).join(" ");
        let r;
        for(let role of msg.guild.roles){
            if(role[1].name.toLowerCase() == roleName){
                r = role[0];
            }
        }

        if(!r)
            return msg.reply("That role doesn't exist");
        
        await dbConnection.changeServerValue(msg.guild.id,"defaultRole", r)
        .then(() => setTimeout(() => {serversManger.loadServers()}, 500));
        msg.reply(`the default role has been changed to ${roleName}`);

    }
}