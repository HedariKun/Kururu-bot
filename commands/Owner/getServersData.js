let connection = require("../../mysql/mysql_controller");

module.exports = {
    name: "getServersData",
    execute(msg){
        connection.getServersData(d => console.log(d));
    }
}