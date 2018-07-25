const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var idUser = '5b575baa5324726a8c019d58';

if (!ObjectID.isValid(idUser)) {
    console.log('ID not valid');
} else {
    User.findById(idUser).then((user) => {
        if (!user) {
            return console.log('User not found');
        }
        console.log('User found:', JSON.stringify(user, undefined, 2));
    }, (e) => {
        console.log(e);
    });
}

// var id = '5b58273b3c76b471261c48ff11';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('ID not found')
//     }
//     console.log('Todo by id', todo);
// }).catch((e) => console.log(e));

