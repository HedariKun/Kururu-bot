module.exports = {
    name:"removeRole",
    execute(msg, args){
        let rolename = "";
        for(let i in args.length-1){
            rolename += `${args[i+1]} `;
        }
        let role = msg.guild.roles.find("name", rolename);
        let member = msg.mentions.members.first();
        if(!msg.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return msg.reply("you can't do the command cause you don't have the permission to do so.");
        if(!role) return msg.reply("this role doesn't exist");
        if(!member.roles.has(role.id)) return msg.reply("member doesn't have that role.");
        member.removeRole(role).then(m => "the role had been removed.");
    }
}