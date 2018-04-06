'use strict';
import BaseRepository from './BaseRepository';

let self, schema;

export default class DeviceMessageRepository extends BaseRepository {
    constructor(q, config, constants, mongoose) {
        super(q, config, constants, config.dataModel.collection.deviceMessage);
        self = this;
        self.q = q;
        self.config = config;
        self.constants = constants;
        self.mongoose = mongoose;

        let Schema = self.mongoose.Schema;
        let schemaStructure = {
            topic: String,
            deviceId: String,
            payload: Schema.Types.Mixed,
            timestamp: { type: Date, default: Date.now }
        };
        schema = self.mongoose.Schema(schemaStructure, { collection: self.config.dataModel.collection.deviceMessage });
    }

    insertDeviceMessage(deviceId, message) {
        message.deviceId = deviceId;
        return self._insert(message, schema)
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

        return self._find(query, schema)
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

