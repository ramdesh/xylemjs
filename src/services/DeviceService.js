
let self;

/**
 * Device Service
 * @constructor
 */
export default class DeviceService {
    constructor(config,
                constants,
                exceptionFactory,
                q,
                deviceRepository) {

        self = this;
        self.q = q;
        self.config = config;
        self.constants = constants;
        self.exceptionFactory = exceptionFactory;
        self.deviceRepository = deviceRepository;
    }

    insertDevice(device) {
        return self.deviceRepository.insertDevice(device)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(null);
            });
    }

    findDevice(id) {
        return self.deviceRepository.findDevice(id)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(null);
            });
    }

    updateDevice(id, device) {
        return self.deviceRepository.updateDevice(id, device)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(null);
            });
    }

    removeDevice(id) {
        return self.deviceRepository.removeDevice(id)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(null);
            });
    }
}
