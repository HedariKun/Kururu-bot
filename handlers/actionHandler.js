const {findMember} = require("./getUser");
const {imageEmbed} = require("./imageEmbed");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    actionHandler: (msg, args, options) => {
        findMember(msg, args)
        .then( member => {
            neko[`getSFW${options.action}`]()
            .then(res => {
                msg.channel.send(imageEmbed(`${msg.author.username} ${options.alias} ${member.user.username}`, res.url));
            });
        })
        .catch(err => {
            if(err.message == "didn't found") return msg.reply(`are you trying to ${options.action} the air?`);
            if(err) throw err; 
            //msg.reply(`are you trying to ${options.action} the air?`)
        });
    }
}

