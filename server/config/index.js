/* globals module */
'use strict';

const connectionStrings = {
    production: process.env.CONNECTION_STRING,
    development: "mongodb://localhost:27017/foodDb"
};

const secretStrings = {
    production: process.env.SECRET_STRING,
    development: 'james bond 007'
};

module.exports = {
    connectionString: connectionStrings[process.env.NODE_ENV || "development"],
    port: process.env.PORT || 3001,
    secret: secretStrings[process.env.NODE_ENV || "development"]
};

const path = require('path');
const rootPath = path.normalize(path.join(__dirname, '/../../'));
const PORT = process.env.PORT || 3001;

// module.exports = {
//     development: {
//         rootPath: rootPath,
//         connectionString: connectionStrings["development"],
//         // connectionString: 'localhost:27017', //use this if you are in the holy Academy 
//         port: PORT,
//         secret: secretStrings.development
//     },
//     production: {
//         rootPath: rootPath,
//         connectionString: connectionStrings[process.env.NODE_ENV],
//         port: PORT,
//         secret: secretStrings.production
//     }
// };