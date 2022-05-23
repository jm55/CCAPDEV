import { MongoClient } from "mongodb";
// Or in CommonJS:
// const mongodb = require('mongodb');
// const client = new mongodb.MongoClient(mongoURI);

const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI);

export function connectToMongo (callback) {
    client.connect(( err, client ) => {
        if (err || !client) {
            // an error occurred during connection attempt
            return callback(err);
        }

        return callback();
    });
    
};

export function getDb (dbName = process.env.DB_NAME) {
    return client.db(dbName);
};

// or in CommonJS:
// module.exports = {
//     connectToMongo,
//     getDb
// }

// Close the client connection on program shutdown
function signalHandler() {
    console.log("Closing mongodb connection...")
    client.close();
    process.exit();
}
process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);