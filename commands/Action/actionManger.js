const {actionHandler} = require("../../handlers/actionHandler");

let actions = [];

function loadActions(){
    makeAction("Cuddle");
    makeAction("Feed");
    makeAction("Hug");
    makeAction("Kiss");
    makeAction("Pat");
    makeAction("Poke");
    makeAction("Slap");
    makeAction("Tickle");

}

function makeAction(actionName){
     let obj = {
        name: actionName,
        alias: [`${actionName}s`],
        description: `Used to ${actionName} someone`,
        execute(msg, args)  {actionHandler(msg, args, {action:this.name, alias:this.alias[0]})}
    }
    actions.push({command: obj, type:"action"});
}

module.exports = {loadActions, actions}