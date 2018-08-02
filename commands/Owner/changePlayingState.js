let {ownerID} = require('../config.json');
module.exports = {
    name:"changePlayingState",
    execute(msg, args){
        if(msg.member.id == ownerID){
            msg.client.user.setPresence({status: 'online', game:{name: `${args.map(e => e).join(" ")}`}});
        } else {
            msg.reply("you don't have permission of this command");
        }
    }
}
