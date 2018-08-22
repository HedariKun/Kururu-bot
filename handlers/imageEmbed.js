const {color} = require("../commands/config.json");

module.exports = {
    imageEmbed(title, imageURL){
        let emb = {
            embed : {
                color:color,
                title: title,
                image: {
                    url : imageURL
                }
            }
        }
        return emb;
    }
}