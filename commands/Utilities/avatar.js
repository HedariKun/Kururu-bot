const {color} = require("../config.json");

module.exports = {
    name:"avatar",
    execute(msg){
        let m = {
            embed: {
                title : "name",
                color : color,
                image: {
                    url : ""
                }
            }
        }
        if(msg.mentions.users.first()){
            m.embed.title = msg.mentions.users.first().username;
            m.embed.image.url = msg.mentions.users.first().displayAvatarURL;
        } else {
            m.embed.title = msg.author.username;
            m.embed.image.url = msg.author.displayAvatarURL;        
        }
        m.embed.image.url = m.embed.image.url.split("?")[0] + "?size=256";
        msg.channel.send(m);
    }
}