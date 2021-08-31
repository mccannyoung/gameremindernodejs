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
    // If it's tuesday, give a 24 hour notice 
    if (dayOfWeek === weekday[2]) {

        client.channels.fetch(channel2Notify).then((channel) => {
            channel.send(`@everyone T-Minus ~24 hours until game time! ${kuma} `).then(() => {
            client.destroy();
            process.exit(0);
        });
        });
    } else if (dayOfWeek === weekday[3]) {
        countdown = 1;
        var ppl2notify = process.env.userlist;

        if (ppl2notify.length > 1) {
            var pplList = ppl2notify.split(',');
            //console.log("userlist "+pplList.toString());
            countdown = countdown + pplList.length;
            pplList.forEach(person => {
                
                client.users.fetch(person).then((result) => {
                    result.send(`Game Day! ${kuma}`).then(arewealldone());
                });
            });
        }

        client.channels.fetch(channel2Notify).then((channel) => {

            channel.send(`@everyone ${kuma} T-MINUS 30 MINUTES TIL GAME TIME!`).then(arewealldone());
        });
    } else {
        console.log('not a day to alert on');
        client.destroy();
        process.exit(0);
    }

});

function arewealldone() {
    console.log("the countdown is currently "+countdown);
    countdown = countdown - 1;
    if (countdown <= 0) {
        console.log("I am exiting via function");
        client.destroy();
        process.exit(0);
    }
}

client.on('message', function (message) {
    if (message.author.bot) return;
});

client.login(process.env.reminderbot);