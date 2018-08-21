let dbConnection = require("../../mysql/mysql_controller");
let serversManger = require("../../mysql/serversManger");

module.exports = {
    name: "addServer",
    execute(msg){
        if(msg.member.id == process.env.OWNERID){
            if(serversManger.getGuild(msg.guild.id))
                return msg.reply("this guild is already registered");
            dbConnection.registerGuild(msg.guild);
            msg.reply("server was added successfully");
        }
    }
}