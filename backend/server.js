const express = require('express');
const runMongo = require('./mongoConnection');
const cors = require('cors');
const { ObjectId } = require('mongodb'); 

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

async function initializeServer() {
  try {
    const client = await runMongo();
    console.log("Connected to MongoDB. Starting the server...");

    app.locals.dbClient = client;

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.post('/api/push_test', async (req, res) => {
      try {
        const newItem = req.body;
        console.log("Pushing new items: ", newItem);
        const result = await app.locals.dbClient.collection.insertOne(newItem);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get('/api/items', async (req, res) => {
      try {
        const items = await app.locals.dbClient.collection.find({}).toArray(); // Fetch all documents from the collection
        console.log("Fetching items: ", items);
        res.status(200).json(items);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

   
    // Start the server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

initializeServer();
