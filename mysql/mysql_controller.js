let mysql = require("mysql");

let dbConnection = new mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "kururu_db"
});

module.exports = {
    
    startDatabasePoke: () => {
        PokeServer();
    },


    getServersData: (callBack) => {
        let sql = 'SELECT * FROM `servers`';
        dbConnection.query(sql, (err, res, field) => {
            if(err) throw err;
            callBack(res);
        });
    },

    async changeServerValue(guildID, key, value){
        let sql = `UPDATE \`servers\` SET \`${key}\`="${value}" WHERE \`serverID\`=${guildID};`;
        dbConnection.query(sql, (err, res, field) => {
            if(err) throw err;
        });
        return;
    },

    registerGuild: async (guild) => {
        let data = 
        {
            serverID: guild.id,
            serverName: guild.name
        }
        console.log(guild.id);
        insertServer(data);
    }


}

function PokeServer(){
    setInterval(() => {
      var sql = "SELECT `serverName` FROM `servers` WHERE `servers`.`id` = 1";
      dbConnection.query(sql, function (err, result, fields) {
          console.log(result);
        if (err) throw err;
        var date = new Date();
        var printMessage =  "[" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() +
                            " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + 
                            "Ping... Selected name: " + result[0].serverName;
        console.log(printMessage);
      });
    }, 14400000);// Pinging each 4 hours
  }

function insertServer(data){
    let sql = `INSERT INTO \`servers\` (\`id\`, \`serverID\`, \`serverName\`, \`prefix\`, \`welcomeMessage\`, \`welcomeMessageActive\`, \`welcomeMessageChannel\`, \`DefaultRole\`) VALUES (NULL, "${data.serverID}", "${data.serverName}", "~", "", 0, "", ""); `;
    dbConnection.query(sql, (err, res, field) => {
        if(err) throw err;
        console.log(`${data.serverName} was added successfully`);
    });
}