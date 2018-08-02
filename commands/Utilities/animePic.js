const fetch = require("node-fetch");
const {color} = require("../config.json");

module.exports = {
    name: "animePic",
    execute(msg, args){
        fetch(`https://yande.re/post.json?limit=100&&tags=${args.map(e => e).join('_')}`)
        .then(t => t.json())
        .then(j => {
            let pics = [];
            let index = 0;

            let title = args.map(e => e).join(" ");
            let emb = {
                embed: {
                    color:color,
                    title: `pic ${title}`,
                    image :{
                        url : ""
                    }
                }
            }
            for(let n in j){
                pics.push(n);
            }
            if(pics.length == 0) return msg.reply("couldn't find image");
            do{
                if(pics.length == 0) index = undefined;
                else {
                    index = Math.floor(Math.random() * pics.length);
                    pics.splice(index, 1);
                }
            } while(j[index].rating != "s" && pics.length > 0 && index != undefined);

            if(pics.length == 0 && j[index].rating != "s") index = undefined;

            if(j[index]) {
                emb.embed.image.url = j[index].jpeg_url;
                msg.channel.send(emb);
            }
            else msg.reply("couldn't find image");
        });

        //msg.reply(j[Math.floor(Math.random() * 100)].jpeg_url)
    }
}