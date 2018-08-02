module.exports = {
    name: "addRole",
    execute(msg, args){
        let rolename = "";
        console.log(args);
        for(let i in args){
            if(i == 0) continue;
            if(i < args.length-1)
                rolename += `${args[i]} `;
            else
                rolename += `${args[i]}`;
            console.log(args[i]);
        }
        console.log(rolename);
        let role = msg.guild.roles.find("name", rolename);
        if(!msg.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return msg.reply("you can't do the command cause you don't have the permission to do so.");
        if(!role) return msg.reply("this role doesn't exist");
        msg.mentions.members.first().addRole(role).then(m => msg.reply("the role had been added."));
    }
}