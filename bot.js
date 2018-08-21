const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const {token, color, prefix} = require("./commands/config.json");
const dbConnection = require("./mysql/mysql_controller");
const serversManger = require("./mysql/serversManger");

const {onMessage, UsedCommands} = require("./events/onMessage");
const {onUserAdd} = require("./events/onUserAdded");

client.commands = new Discord.Collection();
client.commandTypes = new Discord.Collection();

if(process.env.STATS !== "READY"){
    require("dotenv").load();
}   

client.on("ready", () => {
    getCommands("Moderation");
    getCommands("Utilities");
    getCommands("Owner");
    getCommands("Info");
    getCommands("Nsfw");

    dbConnection.startDatabasePoke();
    serversManger.loadServers();
    client.user.setPresence({status: 'online', game:{name:'Getting Made <3'}});
    console.log("\nBot is online");

    setInterval(() => {
        for(let u in UsedCommands){
            if(UsedCommands[u].timer > 0){
                UsedCommands[u].timer--;
            } else {
                UsedCommands.splice(u, 1);
            }
        }
    }, 1000);

});

client.on("message", async msg => {
    let serverPrefix = serversManger.getPrefix(msg.guild.id);   
    onMessage(msg, serverPrefix, client);
});

client.on("guildMemberAdd", async member => {
    onUserAdd(member);
});


function getCommands(name){
    let commandsFile = fs.readdirSync(`./commands/${name}`).filter(file => file.endsWith('.js'));

    console.log(`\nLoading ${name} Commands... \n`);
    for(const file of commandsFile){
        let command = require(`./commands/${name}/${file}`);
        let newName = true;
        
        client.commandTypes.map(e => {
            if(e == name)
                newName = false;
        });

        if(newName) client.commandTypes.set(name, name);

        client.commands.set(command.name.toLowerCase(), {command:command, type:name});
        console.log(`${command.name} Loaded successfully`);
    }

}


client.login(process.env.APIKEY);
