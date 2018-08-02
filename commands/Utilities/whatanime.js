const snekfetch  = require('snekfetch');

const {color} = require("../config.json");

const token = "18287609a92878bbd2db16e2a0b385fdd9d1208f";

module.exports = {
    name: "whatanime",
    execute: async (msg, args) => {
        let imgUrl = args[0];

        let emb = {
            embed : {
                title : "animeName",
                color: color,
                description: "",
                image: {
                    "url" : ""
                }
            }
        }

        let m = await msg.channel.send({
            embed: {
                color:color,
                title : "Searching for your anime, please wait..."
            }
        });


        if(imgUrl){
            const {body} = await snekfetch.get(imgUrl);
            try {
                if(body.length < 1000000){
                    const respons = await snekfetch.post(`https://whatanime.ga/api/search?token=${token}`).attach('image', body.toString('base64'));
                    if(respons.body.docs[0]){
                        const bestMatch = respons.body.docs[0];
                        emb.embed.title = bestMatch.title_romaji;
                        emb.embed.description = `this is from episode #${bestMatch.episode} \n this accurate ${Math.floor(bestMatch.similarity * 100)}%`;
                        emb.embed.image.url = `https://whatanime.ga/thumbnail.php?anilist_id=${bestMatch.anilist_id}&file=${encodeURIComponent(bestMatch.filename)}&t=${bestMatch.at}&token=${bestMatch.tokenthumb}`
                        m.delete();
                        msg.channel.send(emb);
                    }
                }
            }  catch (err) {
                console.log(err);
            }
        }        

    }
}
