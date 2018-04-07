'use strict';
import BaseRepository from './BaseRepository';

let self, schema;

export default class UserRepository extends BaseRepository {
    constructor(q, config, constants, mongoose) {
        super(q, config, constants, config.dataModel.collection.user);
        self = this;
        self.q = q;
        self.config = config;
        self.constants = constants;
        self.mongoose = mongoose;

        let Schema = self.mongoose.Schema;
        let schemaStructure = {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            role: String
        };
        schema = self.mongoose.Schema(schemaStructure, { collection: self.config.dataModel.collection.user });
    }

    insertUser(user) {
        return self._insert(user, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }

    getUsers() {
        return self._findAll({}, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }

    findUser(id) {
        let query = {
            _id: id
        };

        return self._find(query, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }

    updateUser(id, updateUser) {
        let query = {
            _id: id
        };
        return self._update(query, updateUser, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }

    removeUser(id) {
        let deleteUser = {
            _id: id
        };

        return self._remove(deleteUser, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }

    insertBulkUsers(users) {

        return self._bulkInsert(users, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }

    getUserByUsername(username) {
        let query = {
            username: username
        };

        return self._find(query, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }

    checkPassword(username, password) {
        let query = {
            username: username,
            password: password
        };

        return self._find(query, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }
}

