const dbConnection = require("./mysql_controller");
const {prefix} = require("../commands/config.json");

module.exports = {

    servers_info: [],

    loadServers() {
        dbConnection.getServersData(data => {
            this.servers_info = [];
            for(let guild of data){
                this.servers_info.push(guild);
            }
            console.log(`Loaded total of ${data.length} Guild`);
        });
    },

    getPrefix(guildID){
        for(let guild of this.servers_info){
            if(guild.serverID == guildID){
                return guild.prefix;
            }
        }
        return prefix;
    },
    
    getGuild(guildID){
        for(let guild of this.servers_info){
            if(guild.serverID == guildID){
                return guild;
            }
        }
        return false;
    }

}