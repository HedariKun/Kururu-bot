const {color} = require("../config.json");

module.exports = {
    name: "serverInfo",
    execute(msg){
        let guild = msg.guild;
        let d = new Date(guild.createdTimestamp);
        let e = {
            embed: {
                color: color,
                description: "this is the server's infromation",
                author: {
                    name: guild.name,
                    icon_url: guild.iconURL
                },
                fields: [
                    {
                        name: "Owner",
                        value: guild.owner.displayName
                    },
                    {
                        name: "Members",
                        value : `there's ${guild.memberCount} members in this server`
                    },
                    {
                        name: "created at",
                        value: d.toDateString()
                    }
                ],
            }
        }

        msg.channel.send(e);
    }
}