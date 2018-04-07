'use strict';
/**
 * Base class for repository pattern
 */

export default class BaseRepository {
    constructor(q, config, constants, collection) {
        this.q = q;
        this.config = config;
        this.constants = constants;
        this.collection = collection;
    }

    _insert(object, schema) {
        this.model = this.mongoose.model(this.collection, schema);

        let model = new this.model(object);
        let insert = this.q.nbind(model.save, model);

        return insert()
            .then((result) => {
                return result;
            });
    }

    _find(query, schema) {
        this.model = this.mongoose.model(this.collection, schema);

        let find = this.q.nbind(this.model.findOne, this.model);

        return find(query)
            .then((result) => {
                return this.q.when(result);
            });
    }

    _findAll(query, schema) {
        this.model = this.mongoose.model(this.collection, schema);

        let find = this.q.nbind(this.model.find, this.model);
        return find(query)
            .then((result) => {
                return this.q.when(result);
            });
    }

    _remove(query, schema) {
        this.model = this.mongoose.model(this.collection, schema);

        let remove = this.q.nbind(this.model.remove, this.model);

        return remove(query)
            .then((result) => {
                return this.q.when(result);
            });
    }

    _update(query, updateDoc, schema) {
        this.model = this.mongoose.model(this.collection, schema);

        let update = this.q.nbind(this.model.update, this.model);

        return update(query, updateDoc)
            .then((result) => {
                return this.q.when(result);
            });
    }

    _bulkInsert(docs, schema) {
        this.model = this.mongoose.model(this.collection, schema);

        let insert = this.q.nbind(this.model.insertMany, this.model);

        return insert(docs)
            .then((result) => {
                return this.q.when(result);
            });
    }
}