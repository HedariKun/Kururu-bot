let dbConnection = require("../../mysql/mysql_controller");
let serversManger = require("../../mysql/serversManger");


module.exports = {
    name: "addServers",
    execute(msg){
        if(msg.member.id == process.env.OWNERID){
            for(let guild of msg.client.guilds){
                if(!serversManger.getGuild(guild[0])){
                    dbConnection.registerGuild(guild[1]);
                }
            }
            msg.reply("all servers now in DB");
        }
    }
}