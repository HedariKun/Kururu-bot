module.exports = {
    name: "kick",
    execute: async (msg) => {
        let member = msg.mentions.members.first();

        if(!member) return msg.reply("Please mention a vaild member of this server");
        if(!member.kickable) return msg.reply("You can't kick this member.");

        if(msg.member.hasPermission("KICK_MEMBERS")){
            await member.kick("nothing")
            .catch(err => msg.reply(`Sorry ${msg.author} I couldn't kick because of: ${err}`));
            msg.reply(`${member.user.tag} has been kicked by ${msg.author.tag}`);
        } else {
            msg.reply(`you can't kick a person cause you don't have the right permissions`);
        }
    }
}