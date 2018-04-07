var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost:1883');

client.on('connect', function () {
    var count = 3;
    client.subscribe('xylem/test-client/commands');
    for(var i = 0; i < count; i++) {
        client.publish('xylem/test-client/sensor-values',
            '{' +
            '"gyro_x": ' + Math.random() * 10 +
            '"gyro_y":' + Math.random() * 10 +
            '"gyro_z":' + Math.random() * 10 +
            '}');
    }

});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic.toString());
    console.log(message.toString());
    client.end();
});