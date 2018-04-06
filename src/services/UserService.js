
let self;

/**
 * User Service
 * @constructor
 */
export default class UserService {
    constructor(config, 
                constants, 
                exceptionFactory,
                q,
                userRepository,
                deviceRepository) {

        self = this;
        self.q = q;
        self.config = config;
        self.constants = constants;
        self.exceptionFactory = exceptionFactory;
        self.userRepository = userRepository;
    }

    insertUser(user) {
        return self.userRepository.insertUser(user)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(null);
            });
    }

    findUser(id) {
        return self.userRepository.findUser(id)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(null);
            });
    }

    updateUser(id, user) {
        return self.userRepository.updateUser(id, user)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(null);
            });
    }

    removeUser(id) {
        return self.userRepository.removeUser(id)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(null);
            });
    }

    insertBulkUsers(usersArray) {
        return self.userRepository.insertBulkUsers(usersArray)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(null);
            });
    }

    getDevicesByUser(userId) {
        return self.deviceRepository.findDevicesByUser(userId)
            .then(result => {
                return self.q.when(result);
            })
            .catch(err => {
                console.log(err);
                return self.q.when(null);
            });
    }
}
