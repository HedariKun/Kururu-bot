module.exports = {
    name : "purge",
    execute : async (msg, args) => {

        if(!msg.member.hasPermission("ADMINISTRATOR") && msg.author.id != process.env.OWNERID) return msg.reply("You can't call the command");
        const deleteCount = parseInt(args[0], 10);

        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
            return msg.reply("please provide a number between 2 and 100 for the number of messages to delete");
        
        const fetched = await msg.channel.fetchMessages({limit:deleteCount});
        msg.channel.bulkDelete(fetched)
            .catch(err => msg.reply(`Couldn't delete messages cause of ${err}`));

    }
}