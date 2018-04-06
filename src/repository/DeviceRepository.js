'use strict';
import BaseRepository from './BaseRepository';

let self, schema;

export default class DeviceRepository extends BaseRepository {
    constructor(q, config, constants, mongoose) {
        super(q, config, constants, config.dataModel.collection.device);
        self = this;
        self.q = q;
        self.config = config;
        self.constants = constants;
        self.mongoose = mongoose;

        let Schema = self.mongoose.Schema;
        let schemaStructure = {
            type: String,
            ownerId: String
        };
        schema = self.mongoose.Schema(schemaStructure, { collection: self.config.dataModel.collection.device });
    }

    insertDevice(device) {
        device._id = device.id;
        delete device.id;
        return self._insert(device, schema)
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

    findDevicesByUser(userId) {
        let query = {
            ownerId: userId
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

    updateDevice(id, updateDevice) {
        let query = {
            _id: id
        };
        return self._update(query, updateDevice, schema)
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
            _id: id
        };

        return self._remove(deleteDevice, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }
}

