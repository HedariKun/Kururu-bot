let fetch = require("node-fetch");

module.exports = {
    limit : 25,
    apiKey : "7hu8H0rUNu29TBhUpPIeyVCge0c1RI19",
    get: async(tag) => {
        let t = tag || "anime";
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIFAPIKEY}&q=${t}&limit=25&offset=0&rating=G&lang=en`;
        let g = await fetch(url)
                .then(e => e.json())
                .then(j => j.data[Math.floor(Math.random() * j.data.length)])
                .catch(err => console.log(err));
        if(!g) return null;
        else return g.images.original.url;
    }
}