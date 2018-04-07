
let self;

/**
 * Device Message Service
 * @constructor
 */
export default class DeviceMessageService {
    constructor(config,
                constants,
                exceptionFactory,
                q,
                deviceMessageRepository) {

        self = this;
        self.q = q;
        self.config = config;
        self.constants = constants;
        self.exceptionFactory = exceptionFactory;
        self.deviceMessageRepository = deviceMessageRepository;
    }

    insertDeviceMessage(deviceId, topic, payload) {
        let message = {
            topic: topic,
            payload: payload
        };
        return self.deviceMessageRepository.insertDeviceMessage(deviceId, message)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(null);
            });
    }

    findDeviceMessage(deviceId, messageId) {
        return self.deviceMessageRepository.findDeviceMessage(deviceId, messageId)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(null);
            });
    }

    findMessagesByDevice(deviceId) {
        return self.deviceMessageRepository.findMessagesByDevice(deviceId)
            .then((result) => {
                let messages = [];
                if(Array.isArray(result)) {
                    for(let i = 0; i < result.length; i++) {
                        let message = result[i];
                        if(message.topic.split("/")[0] !== "$SYS") {
                            messages.push(message);
                        }
                    }
                }
                return self.q.when(messages);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(null);
            });
    }
}
