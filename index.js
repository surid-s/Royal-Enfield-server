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
// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        // console.log('connected to database');

        const database = client.db('tourDB')
        const tourCollection = database.collection('tours');


        //GET API DATA
        app.get('/services', async (req, res) => {
            const cursor = tourCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })


        //POST API
        app.post('/services', async (req, res) => {
            // console.log('hit the api')
            const service = req.body;

            const result = await tourCollection.insertOne(service);
            console.log(result);
            res.json(result);
        })
        // add Events
        app.post("/addEvent", async (req, res) => {
            console.log(req.body);
            const result = await EventsCollection.insertOne(req.body);
            console.log(result);
        });

        // get search events
        app.get("/searchEvent", async (req, res) => {
            const result = await EventsCollection.find({
                title: { $regex: req.query.search },
            }).toArray();
            res.send(result);
            console.log(result);
        });

        // add volunteer
        app.post("/addVolunteer", async (req, res) => {
            console.log(req.body);
            const result = await volunteerCollection.insertOne(req.body);
            res.send(result);
        });

        // get all volunteer

        app.get("/allVolunteer", async (req, res) => {
            const result = await volunteerCollection.find({}).toArray();
            res.send(result);
            console.log(result);
        });
        // get all events

        app.get("/allEvents", async (req, res) => {
            const result = await EventsCollection.find({}).toArray();
            res.send(result);
        });

        // delete event

        app.delete("/deleteEvent/:id", async (req, res) => {
            console.log(req.params.id);
            const result = await EventsCollection.deleteOne({
                _id: ObjectId(req.params.id),
            });
            res.send(result);
        });

        // my events

        app.get("/myEvents/:email", async (req, res) => {
            const result = await EventsCollection.find({
                email: req.params.email,
            }).toArray();
            res.send(result);
        });
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