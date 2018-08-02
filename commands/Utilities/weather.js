const fetch = require("node-fetch");
const apiKey = "a1bff1914821fa8bec9fa0b0a436288f";
const {color} = require("../config.json");

module.exports = {
    name: "weather",
    execute(msg, args){
        if(!args[0]) return msg.reply("you need to provide a city");
        if(!args[1]) return msg.reply("you need to provide a country");
        fetch(`http://api.openweathermap.org/data/2.5/find?q=${args[0]},${args[1]}&&apikey=${apiKey}`)
        .then(t => t.json())
        .then(j => {
            if(!j) return msg.reply("couldn't find that location.");
            let emb = {
                embed: {
                    title: `Forcast info for ${args[0]}, ${args[1]}`,
                    color: color,
                    description: `${j.list[0].weather[0].description}`,
                    fields:[
                        {
                            name:"Weather",
                            value: `${j.list[0].weather[0].main}`,
                            inline: true
                        },
                        {
                            name:"Wind speed",
                            value:`${j.list[0].wind.speed} km/s`,
                            inline: true,
                        },
                        {
                            name:"Temp",
                            value:`${Math.floor(j.list[0].main.temp - 273)}`,
                            inline: true,
                        },
                        {
                            name:"Humidity",
                            value: `${j.list[0].main.humidity}%`,
                            inline: true,
                        },
                        {
                            name:"More info",
                            value: `${j.list[0].rain ? "is raining" : "is not raining"} \n ${j.list[0].snow ? "is raining" : "is not raining"}`
                        }
                    ],
                    footer: {
                        text: "powered by OpenWeather API"
                    }
                }
            }
            msg.channel.send(emb);
        })

    }
}