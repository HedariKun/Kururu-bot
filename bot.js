const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();

const {token, color, prefix} = require("./commands/config.json");

const Canvas = require('canvas');
const snekfetch = require('snekfetch');

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
    client.user.setPresence({status: 'online', game:{name:'Getting Made <3'}});
    console.log("\nBot is online");
});

client.on("message", async msg => {
    if(msg.mentions.users.first() == client.user && msg.content.startsWith("<")){
        msg.reply(`the bot's prefix is ${prefix} \n do ${prefix}help for the commands list.`);
    }

    if(msg.author.bot || !msg.content.startsWith(prefix)) return;
    
    let args = msg.content.split(" ");
    let commandName = args.shift().slice(1).toLowerCase();
    let command;
    
    if(client.commands.has(commandName)){
        command = client.commands.get(commandName).command;
    } else {
        client.commands.map(e => {
            if(!e.command.alias) return;
            for(let i = 0; i < e.command.alias.length; i++){
                if(e.command.alias[i].toLowerCase() == commandName){
                    command = e.command;
                }
            }
        });
    }

    if(command){
        try {
            command.execute(msg, args);
        } catch (err) {
            console.log(err);
        }
    } else {
        msg.channel.send("that command doesn't exist");
    }

    // if(client.commands.has(command)){
    //     try {
    //     client.commands.get(command).command.execute(msg, args);
    //     } catch(err){
    //         console.log(err);
    //     }
    // } else {
    //     msg.channel.send("That command doesn't exist");
    // }

});

client.on("guildMemberAdd", async member => {
    const channel = member.guild.channels.find(ch => ch.name === "general");
    if(!channel) return;

    let role = member.guild.roles.find("name", "Member");
    member.addRole(role).catch(console.error)

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = `#DC143C`;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '28px sans-serif';
    ctx.fillStyle = "#fcfcfc";
    ctx.fillText("Welcome to the server, ", canvas.width/2.5, canvas.height/3.5);

    ctx.font = applyText(canvas, `${member.displayName}!`, canvas.width/2.5, canvas.height/1.8);
    ctx.fillStyle = '#fcfcfc';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);


    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const {body : buffer} =  await snekfetch.get(member.user.displayAvatarURL);
    const avatar = await Canvas.loadImage(buffer);
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.Attachment(canvas.toBuffer(), "welcome-image.png");
    channel.send("", attachment);

});

const applyText = (canvas, text) => {

    let ctx = canvas.getContext("2d");
    let fontSize = 70;
    
    do {
        ctx.font = `${fontSize -= 10}px sans-serif`;
    } while(ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;

}


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
while(process.env.STATS !== "READY"){
    console.log("Loading Process");
}
client.login(process.env.APIKEY);
