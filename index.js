const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = 5000;

//middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zx442.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        // console.log('connected to database');

        const database = client.db('tourDB')
        const tourCollection = database.collection('tours');


        //POST API
        app.post('/services', async (req, res) => {
            console.log('hit the api', service)

            // const result = await tourCollection.insertOne(service);
            // console.log(result);
            res.send('hitted');
        })
    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('running tour')
});

app.listen(port, () => {
    console.log('running server', port);
})