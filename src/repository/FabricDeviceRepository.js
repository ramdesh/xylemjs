'use strict';
import BaseRepository from './BaseRepository';

let self, schema;

export default class FabricDeviceRepository extends BaseRepository {
    constructor(q, config, constants, fabclient) {
        super(q, config, constants, config.dataModel.collection.device);
        self = this;
        self.q = q;
        self.config = config;
        self.constants = constants;
        self.fabclient = fabclient;


    }

    insertDevice(device) {
        return self.fabclient._insert(device, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }

    findDevice(id) {
        let query = {
            clientId: id
        };

        return self.fabclient._find(query, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }

    findDevicesByUser(userId) {
        let query = {
            ownerId: userId
        };
        return self.fabclient._findAll(query, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }

    updateDevice(id, updateDevice) {
        let query = {
            clientId: id
        };
        return self.fabclient._update(query, updateDevice, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }

    removeDevice(id) {
        let deleteDevice = {
            clientId: id
        };

        return self.fabclient._remove(deleteDevice, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }
}

