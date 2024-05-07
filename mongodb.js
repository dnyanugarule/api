const { MongoClient } = require('mongodb');
const url = "mongodb://127.0.0.1:27017";  // Change if necessary
// Connection string for MongoDB
const database = 'student';  // Name of the database
const client = new MongoClient(url);

const dbConnect = async () => {
    // Correct method to connect
    await client.connect();
    const db = client.db(database);
    return db.collection('profile');
};

module.exports = dbConnect;
