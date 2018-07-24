// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')
    const name1 = 'Michael';

    db.collection('Users').find({
        name: name1
        // _id: new ObjectID('5b5613f13774616469374bcc')
    }).toArray().then((docs) => {
        console.log(`Users with name ${name1}:`);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    db.collection('Users').find({name: name1}).count().then((count) => {
        console.log(`We found ${count} record(s) of name ${name1}.`);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    client.close();
});
