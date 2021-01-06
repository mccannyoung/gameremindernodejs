require('dotenv').config();
const Discord = require("discord.js");
const {prefix} = require('./config.json');

const client = new Discord.Client({disableEveryone: false});

client.on('ready', ()=>{
    client.user.setActivity("the clock", {type: 'WATCHING'});
    
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var now = new Date();
    var nowDay = now.getDay();
    dayofWeek = weekday[now.getDay()];
    var channel2Notify = process.env.gamechan;
    const kuma  = '<:monkey_face:795697280605749268>';
    if(dayofWeek === weekday[2])
    {
 
        client.channels.fetch(channel2Notify).then((channel) =>{
            channel.send(`@everyone ${kuma} Tuesday test`);
        }
        );
    } else if (dayofWeek == weekday[3])
    {
        var ppl2notify = process.env.userlist;
        console.log('user list');
        console.log(ppl2notify);
        if(ppl2notify.length>1) {
            var pplList = ppl2notify.split(',');

            pplList.forEach(person =>{
                console.log(`person : ${person}`);
                client.users.fetch(person).then( (result) =>{
                    result.send(`Game Day! ${kuma}`);
                }
            );
            });
        }
        console.log(`going to notify ${channel2Notify}`);
        client.channels.fetch(channel2Notify).then((channel) =>{
            channel.send(`@everyone ${kuma} `);
        }
        );
    }
    console.log(`today ${nowDay} is ${dayofWeek}`);
}


);

client.on('message', function(message) {
    if (message.author.bot) return;
}
);

client.login(process.env.reminderbot);