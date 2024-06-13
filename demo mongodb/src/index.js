// const { MongoClient } = require("mongodb");

// async function start() {
//     const connectionString = "mongodb://localhost:27017";
//     const client = new MongoClient(connectionString, {
//         useUnifiedTopology: true,
//     });

//     await client.connect();

//     const db = client.db('testdb')
//     const collection = db.collection('people')
//     const cursor = collection.find({});
//     const results = await cursor.toArray();
//     console.log(results);
// }

// start();

const mongoose = require("mongoose");
const { Person } = require("./models/Person");

async function start() {
    const connectionString = "mongodb://localhost:27017";
    await mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    console.log("Database connect");

    const myPerson = new Person({
        name: "Peter",
        age: 25,
    });

    await myPerson.save();

    const document = await Person.find({});

    console.log(document);
}

start();