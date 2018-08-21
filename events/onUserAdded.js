const Canvas = require('canvas');
const snekfetch = require('snekfetch');
const Discord = require("discord.js");
const serversManger = require("../mysql/serversManger");

module.exports = {
    onUserAdd: async (member) => {
    
    const guildData = serversManger.getGuild(member.guild.id);
    let role = member.guild.roles.get(guildData.DefaultRole);
    
    if(role)
        member.addRole(role).catch(console.error)

    const channel = member.guild.channels.get(guildData.WelcomeMessageChannel);
    if(channel){
        if(guildData.welcomeMessage != ""){
            let words = guildData.welcomeMessage.split(" ");
            let context = "";
            for(let w of words){
                if(w == "[USER]"){
                    context += `<@${member.id}> `;
                } else if (w == "[SERVER]"){
                    context += `${member.guild.name} `;
                } else {
                    context += `${w} `;
                }
            }
            channel.send(context);
        }

        if(guildData.welcomeMessageActive == 1){
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
            }
        }
    }
}

const applyText = (canvas, text) => {

    let ctx = canvas.getContext("2d");
    let fontSize = 70;
    
    do {
        ctx.font = `${fontSize -= 10}px sans-serif`;
    } while(ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
    }