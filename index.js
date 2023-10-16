const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongo = require('mongodb');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname + 'config/secret.env')});

const PORT = 3000;

app.set('view engine', 'ejs');

// connect to mongodb
const client = new mongo.MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: mongo.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try{
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);

// Configure app to user authRoutes, '/auth' is path to access router
app.use('/auth',authRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});