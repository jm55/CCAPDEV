import { MongoClient } from 'MongoDB'
// Connection URL
const connectionString = process.env.MONGODB_URI;
const client = new MongoClient(connectionString);

export function connectToServer (callback)  {
    client.connect((err, client) => {
        if (err || !client) {
            return callback(err);
        }

        console.log("Successfully connected to MongoDB.");

        return callback();
    });
};

export function getDb (dbName = process.env.DB_NAME) {
    return client.db(dbName);
}
