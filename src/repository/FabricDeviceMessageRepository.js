'use strict';
import BaseRepository from './BaseRepository';

let self, schema;

export default class DeviceMessageRepository extends BaseRepository {
    constructor(q, config, constants, fabclient) {
        super(q, config, constants, config.dataModel.collection.deviceMessage);
        self = this;
        self.q = q;
        self.config = config;
        self.constants = constants;
        self.fabclient = fabclient;

    }

    insertDeviceMessage(deviceId, message) {
        message.deviceId = deviceId;
        return self.fabclient._insert(message, schema)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
                return self.q.when({});
            });
    }

    findDeviceMessage(deviceId, messageId) {
        let query = {
            _id: messageId,
            deviceId: deviceId
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

    findMessagesByDevice(deviceId) {
        let query = {
            deviceId: deviceId
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
}

