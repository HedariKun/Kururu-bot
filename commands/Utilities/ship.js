const {findMember} = require("../../handlers/getUser");

module.exports = {
    name: "ship",
    description: "to measure the love rate with someone else <3",
    usage: "(User)",
    execute(msg, args){
        findMember(msg, args).then(member => {
        if(!member) return msg.reply("you need to select someone to ship with.");
        let sec = Date.now() / 1000;
        let min = Math.floor(sec / 60);
        let hours = Math.floor(min / 60);
        let day = Math.floor(hours / 24);
        let shipRate = Math.floor((msg.author.id/1000 + member.user.id/1000) / day) + (day * 60);
        shipRate %= 101;
        msg.channel.send(`the love between \`\`${msg.author.username}\`\` and \`\`${member.displayName}\`\` is ${shipRate}% <3`);
        })
    }
}

