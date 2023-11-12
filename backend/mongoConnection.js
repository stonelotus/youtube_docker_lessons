const { MongoClient } = require('mongodb');

const uri = "mongodb://172.17.0.2:27017/";
const client = new MongoClient(uri);

async function runMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("myDatabase");
    const collection = db.collection("items");

    return { client, collection };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

module.exports = runMongo;