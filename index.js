const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;


const port = process.env.PORT || 5000;

// mongodb connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ncbah.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json())

async function run() {
    try{
        await client.connect();
        const database = client.db('mediversal_hospital');
        const servicesCollection = database.collection("services");
        const doctorsCollection = database.collection("doctors");
        const departmentsCollection = database.collection('departments');


        // get services
          app.get("/services", async (req, res) => {
            const result = await servicesCollection.find({}).toArray();
            res.send(result);
        });

        // get doctors
          app.get("/doctors", async (req, res) => {
            const result = await doctorsCollection.find({}).toArray();
            res.send(result);
        });
        
        // get departments
          app.get("/departments", async (req, res) => {
            const result = await departmentsCollection.find({}).toArray();
            res.send(result);
        });

        
    }
    finally {
        // await client.close();
    }
}
 
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello Mediversal Hospital!')
  })
   
  app.listen(port, () => {
    console.log(`listening at ${port}`)
  })