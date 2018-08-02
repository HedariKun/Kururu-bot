    const {color} = require('../config.json')

    module.exports = {
        name:"botinfo",
        execute(msg, args){
            
            const ms = msg.client.uptime;
            const sec = ms / 1000;
            const minute = sec > 59 ? Math.floor(sec / 60) : 0;
            const hour = minute > 59 ? Math.floor(minute / 60) : 0;
            const day = hour > 23 ? Math.floor(hour / 24) : 0;

            let GuildNum = 0;
            let members = 0;
            msg.client.guilds.map(g => {
                g.members.map(m => {
                    members++;
                });
                GuildNum++;
            });



            let emb = {
                embed : {
                    title : "Kururu's info",
                    color:color,
                    thumbnail: {
                        url: msg.client.user.displayAvatarURL
                    },
                    fields: [
                        {
                            name:"info",
                            value: `this bot is running in ${GuildNum} servers \n and taking care of ${members} member`,
                        },
                        {
                            name: "Language",
                            value: "JavaScript",
                            inline: true
                        },
                        {
                            name: "Owner",
                            value: "Hedari",
                            inline: true
                        }, 
                        {
                            name: "Run Time",
                            value: `this bot is running for ${day} day, ${hour - (day * 24)} hour, ${minute - (hour * 60)} minute and ${Math.floor(sec - (minute * 60))} seconds`
                        }
                    ]
                }
            }
            msg.channel.send(emb);
            
        }
    }