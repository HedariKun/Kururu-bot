const serversManger = require("../mysql/serversManger");
const dbConnection = require("../mysql/mysql_controller");

module.exports = {
    onJoinGuild(guild){
        if(serversManger.getGuild(guild.id))
            return;
        
        dbConnection.registerGuild(guild);
        serversManger.loadServers();
    }
}