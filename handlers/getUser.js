function getUser(guild, userName){
    return new Promise((resolve, reject) => {
        for(let member of guild.members){
            let itMember = true;

            if(userName.length > member[1].displayName)
                itMember = false;
            else
                for(let l in userName){
                    {
                        let name = member[1].displayName.toLowerCase();
                        if(userName[l].toLowerCase() != name[l]){
                            itMember = false;
                        }
                    }
                }

            if(member[0] == userName){
                itMember = true;
            }
            if(itMember)
                resolve(member[1]);
        }
        reject(new Error("didn't found"));
    })
}

function findMember(msg, args){
    return new Promise((resolve, reject) => {
        let member = msg.mentions.members.first();
        if(member){
            resolve(member);
        } else {
            const memberName = args.map(e => e).join(" ");
            member = getUser(msg.guild, memberName);
            if(member){
                resolve(member);
            } else {
                reject(new Error("couldn't find the user"));
            }
        }
    });
}


module.exports = {getUser, findMember};
    
    