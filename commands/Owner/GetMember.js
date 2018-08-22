const {getUser} = require("../../handlers/getUser");

module.exports = {
    name:"GetMember",
    execute: async (msg, args) => {
        if(msg.member.id == process.env.OWNERID){
            let memberName = args.map(e => e).join(" ");
            getUser(msg.guild, memberName)
            .then(m => console.log(m));

        } else {
            msg.reply("you don't have permission of this command");
        }
    }
}
