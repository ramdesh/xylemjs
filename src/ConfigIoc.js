import awilix from 'awilix';
import router from './api/router';
import * as constants from './utils/constants';
import config from './config/Configuration';

// Import libraries
import express from 'express';
import underscore from 'underscore';
import q from 'q';
import swaggerJSDoc from 'swagger-jsdoc';
import mongoose from 'mongoose';

// Import Utils
import HelpersUtil from './utils/helpersUtil';

// Import Middleware
import CrossOriginMW from './middleware/CrossOriginMW';

// Import controllers
import HelloController from './api/hello/HelloController';

// Import Factories
import ExceptionFactory from './error/ExceptionFactory';

// Import Services
import HelloService from './services/HelloService';

// Import Repositories
import HelloRepository from './repository/HelloRepository';
import BaseRepository from './repository/BaseRepository';

let container = awilix.createContainer({
    resolutionMode: awilix.ResolutionMode.CLASSIC
});

mongoose.connect(config.DB.mongodb.nodebaseapp.connection, { useMongoClient: true });

console.log("Initializing Swagger API documentation...");
let swaggerDefinition = {
    info: {
        title: 'RESTful web services for node/express/es6 starter',
        version: '1.0.0',
        description: 'Documentation for node/express/es6 starter',
    },
    host: 'localhost:3001',
    basePath: '/v1/',
    schemes: ['http'],
    consumes: ["application/json"],
    produces: ["application/json"]
};
let options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['dist/api/**/*.js']
};
let swaggerSpec = swaggerJSDoc(options);

console.log("Registering dependencies...");
container.register({
    // Register libraries
    q: awilix.asValue(q),
    express: awilix.asValue(express),
    underscore: awilix.asValue(underscore),
    router: awilix.asClass(router).singleton(),
    config: awilix.asValue(config),
    exceptionFactory: awilix.asClass(ExceptionFactory).singleton(),
    constants: awilix.asValue(constants),
    swaggerSpec: awilix.asValue(swaggerSpec),
    mongoose: awilix.asValue(mongoose),
    helpersUtil: awilix.asValue(HelpersUtil),

    // Register middleware
    crossOriginMW: awilix.asClass(CrossOriginMW).singleton(),

    // Register controllers
    helloController: awilix.asClass(HelloController).singleton(),

    // Register services
    helloService: awilix.asClass(HelloService).singleton(),

    // Register repository
    helloRepository: awilix.asClass(HelloRepository).singleton(),
    baseRepository: awilix.asClass(BaseRepository).singleton()
});

export default container;