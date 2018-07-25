const {ObjectID} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.post('/users', (req, res) => {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });
    console.log('Data from mongoose');
    console.log(user);
    user.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
        console.log(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/123
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();    
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        // res.send('Todo found:' + JSON.stringify(todo, undefined, 2));
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });



    // res.send('Well done!');
    // Todo.findById(id).then((todo) => {
    //     if (!todo) {
    //         return todo.status(400).send();
    //     }
    //     todo.send('Todo found:', JSON.stringify(todo, undefined, 2));
    // }, (e) => {
    //     todo.send(e).done();
    // });

});

// ---------------------------------------------------

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({users});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};

