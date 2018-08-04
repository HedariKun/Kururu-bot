module.exports = {
    name: "ship",
    description: "to measure the love rate with someone else <3",
    usage: "(User)",
    execute(msg, args){
        let member = msg.mentions.members.first();
        if(!member) return msg.reply("you need to select someone to ship with.");
        let sec = Date.now() / 1000;
        let min = Math.floor(sec / 60);
        let hours = Math.floor(min / 60);
        let day = Math.floor(hours / 24);
        let shipRate = ((msg.author.id + member.user.id) / day) + (day * 60);
        shipRate %= 101;
        msg.reply(`your love rate is ${shipRate}%`);
    }
}