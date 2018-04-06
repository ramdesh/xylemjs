module.exports = {
    env: 'DEV',
    port: 3001,
    clusteringEnabled: false,
    errors: require("../ConfigErrors"),

    DB: {
      mongodb: {
        nodebaseapp: {
          connection: "mongodb://xylemapp:1qaz2wsx@ds125489.mlab.com:25489/xylem",
        }
      }
    },

    dataModel: {
      collection: {
        user: "User",
        device: "Device",
        pubSub: "PubSub",
        deviceMessage: "DeviceMessage"
      }
    }
};