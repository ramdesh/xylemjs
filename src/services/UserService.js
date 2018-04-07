
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
                return self.q.when(err);;
            });
    }

    findUser(id) {
        return self.userRepository.findUser(id)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(err);
            });
    }

    getUsers() {
        return self.userRepository.getUsers()
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(err);
            });
    }

    updateUser(id, user) {
        return self.userRepository.updateUser(id, user)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(err);
            });
    }

    removeUser(id) {
        return self.userRepository.removeUser(id)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(err);
            });
    }

    insertBulkUsers(usersArray) {
        return self.userRepository.insertBulkUsers(usersArray)
            .then((result) => {
                return self.q.when(result);
            })
            .catch((err) => {
                console.log(err);
                return self.q.when(err);
            });
    }

    getDevicesByUser(userId) {
        return self.deviceRepository.findDevicesByUser(userId)
            .then(result => {
                return self.q.when(result);
            })
            .catch(err => {
                console.log(err);
                return self.q.when(err);
            });
    }

    loginUser(username, password) {
        return self.userRepository.getUserByUsername(username)
            .then(result => {
                if(!result || !result.username) {
                    throw self.exceptionFactory.createInstance('E0100', 404);
                }
                return self.userRepository.checkPassword(username, password)
                    .then(user => {
                       if(user && user.username) {
                           delete user.password;
                           return self.q.when(user);
                       } else {
                           throw self.exceptionFactory.createInstance('E0101', 403);
                       }
                    });
            })
            .catch(err => {
                console.log(err);
                return self.q.when(err);
            });
    }
}
