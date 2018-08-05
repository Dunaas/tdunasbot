var tmi = require('tmi.js');


var canais = ['dunaaas','diffensive','sirgank','mahriojr','dobrein','noelbh', 'gaules'];

var options = {
    options: {
        debug: false
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "dunaaas",
        password: process.env.OAUTH_TOKEN
    },
    channels: canais

};
//eval(fs.readFileSync('slot.js')+'');

var client = new tmi.client(options);
client.connect();

//variaveis de eventos

client.on('connected', function(address, port) {
    console.log("Address: " + address + " Port: " + port);
});

client.on("chat", function (channel, userstate, message, self) {
    let command = message.split(" ")[0];
    let args = message.split(" ").slice(1);
    if (command === '!adicionar' && canais.indexOf(args[0]) === -1 && canais.indexOf('#' + args[0]) === -1){
        setTimeout(function() {
        canais.push(args[0]);
        console.log(canais);
    }, 5);
    }
    if (command === '!adicionar' && canais.indexOf(args[0]) != -1){
        client.say("dunaaas", "Este canal já faz parte!");
        console.log(canais);
    }
    if (command === '!adicionar' && canais.indexOf('#' + args[0]) != -1){
        client.say("dunaaas", "Este canal já faz parte!");
        console.log(canais);
    }
    if (command === '!log' && userstate['username'] === 'dunaaas'){
        client.say("dunaaas", canais.toString());
        console.log(canais);
    }
});
