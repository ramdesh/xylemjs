var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost:1883');

client.on('connect', function () {
    //client.subscribe('xylem/test-client/sensor-values');
    client.publish('xylem/test-client/sensor-values',
        '{' +
        '"gyro_x":"3.019201019"' +
        '"gyro_y":"10.019201019"' +
        '"gyro_z":"4.1829181"' +
        '}');
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic.toString());
    console.log(message.toString());
    client.end();
});