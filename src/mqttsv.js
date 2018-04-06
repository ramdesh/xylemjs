import mosca from 'mosca';
import config from './config/Configuration';
import container from './ConfigIoc';

let server;
let deviceMessageService = container.resolve('deviceMessageService');
let ascoltatore = {
    //using ascoltatore
    type: 'mongo',
    url: config.DB.mongodb.nodebaseapp.connection,
    pubsubCollection: config.dataModel.collection.pubSub,
    mongo: {}
};

let moscaSettings = {
    // port: 1883,
    interfaces:[
        {
            type:"mqtt",
            port: 1883
        },
        // {type:"mqtts", port:8883, credentials:{keyPath:SECURE_KEY,certPath: SECURE_CERT}},
    ],
    backend: ascoltatore,
    logger:{
        name: "secureExample",
        label: 40,
    },
    persistence: {
        factory: mosca.persistence.Mongo,
        url: config.DB.mongodb.nodebaseapp.connection
    }
    // secure: {
    //   keyPath: SECURE_KEY,
    //   certPath: SECURE_CERT,
    // }
};

let Mqttsv = function(){
    console.log('Initializing MQTT broker on port 1883');
    server = new mosca.Server(moscaSettings);
    server.on('ready', setup);
    server.on('clientConnected', function(client) {
        console.log('client connected', client.id);
    });

    // fired when a message is received
    server.on('published', function(packet, client) {
        console.log('Published', packet);
        deviceMessageService.insertDeviceMessage('test-client', packet.topic, packet.payload.toString());
    });

    // when client return puback,
    server.on('delivered', function(packet, client){
        console.log('Delivered', packet);
    });
};

/*
 * Module exports
 */
module.exports = new Mqttsv();

Mqttsv.prototype.getServer = function(){
    return server;
};

function setup() {
    console.log('Mosca server is up and running');
};