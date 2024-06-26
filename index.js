const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb+srv://atharvapkhond:rQlsoijG4bvMibyj@smsapp.osyq5sv.mongodb.net/?retryWrites=true&w=majority&appName=smsApp";
const client = new MongoClient(url);

let db, coll;

client.connect()
    .then(() => {
        db = client.db("sms26june24");
        coll = db.collection("student");
        console.log("Connected to database");
    })
    .catch(err => console.error(err));

app.post("/save", (req, res) => {
    const record = { "_id": req.body.rno, "name": req.body.name, "marks": req.body.marks };
    coll.insertOne(record)
        .then(result => res.send(result))
        .catch(error => res.status(500).send(error));
});

﻿

app.put("/us", (req, res) => {
const whom = {"_id": req.body.rno};
const what = {"$set": {"name": req.body.name, "marks":req.body.marks}}
coll.updateOne( whom, what)
.then(result => res.send(result))
.catch(error => res.send(error));
});

app.get("/gs", (req, res) => {
    coll.find({}).toArray()
        .then(result => res.send(result))
        .catch(error => res.status(500).send(error));
});

app.delete("/rs", (req, res) => {
    const record = { "_id": req.body.rno };
    coll.deleteOne(record)
        .then(result => res.send(result))
        .catch(error => res.status(500).send(error));
});

const port = 9000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Close the MongoDB client when the Node process ends
process.on('SIGINT', () => {
    client.close()
        .then(() => {
            console.log("MongoDB connection closed");
            process.exit(0);
        })
        .catch(err => {
            console.error("Error closing MongoDB connection", err);
            process.exit(1);
        });
});
