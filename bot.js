require('dotenv').config();
const Discord = require("discord.js");

const client = new Discord.Client({
    disableEveryone: false
});
var countdown = 5;
client.on('ready', () => {
    client.user.setActivity("the clock", {
        type: 'WATCHING'
    });
    
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var now = new Date();

    console.log(`${now}`);

    var dayOfWeek = weekday[now.getDay()];

    //console.log(`${dayOfWeek}`);

    var channel2Notify = process.env.gamechan;
    const kuma = '<:monkey_face:795697280605749268>';

    if (dayOfWeek === weekday[2]) {// If it's tuesday, give a 24 hour notice 

        client.channels.fetch(channel2Notify).then((channel) => {
            try {
                channel.send(`<@&996187780956835870> T-Minus ~24 hours until game time! ${kuma} `).then(() => {
                client.destroy();
                process.exit(0);
                });
            } catch(error){
                console.error(error)
            }
        });
    } else if (dayOfWeek === weekday[3]) {

        try {
        client.channels.fetch(channel2Notify).then((channel) => {

            channel.send(`<@&996187780956835870> ${kuma} T-MINUS 30 MINUTES TIL GAME TIME!`).then(() => {
                client.destroy();
                process.exit(0);
            });
        });
    } catch(error){
        console.error(error)
    }
    } else {
        console.log('not a day to alert on');
        client.destroy();
        process.exit(0);
    }

});


client.on('message', function (message) {
    if (message.author.bot) return;
});

client.login(process.env.reminderbot);