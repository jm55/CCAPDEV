import "dotenv/config";
import { connect } from "./src/models/db.js";
import { User } from './src/models/users.js';

connect();

// Constructor approach (Instantiate a document instance, then save)
const john = new User();
john.name = {
    first: 'John',
    last: 'Smith'
};
john.age = 26;
john.save((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Successfully saved John Smith");
});

// Create approach (Creates and saves a document immediately)
User.create({
    name: {
        first: 'Mark',
        last: 'Zuckerberg'
    },
    age: 38
}, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Successfully saved Mark Zuckerberg");
})

// finding wherein filter is a field of a subdocument
User.find({'name.first': 'Bob'}).limit(1).exec((err, res) => {
    if (err)
        console.log(err);
    console.log(res);
});

// finding all then going specific through querying
User.find()
.where('age').lt(30).exec((err, res) => {
    if (err)
        console.log(err);
    console.log(res);
});

// Updating wherein filter is a field of a subdocument
User.updateOne({'name.first':'John'}, {
    $set: {age: 1}
}, (err, res) => {
    if (err)
        console.log(err);
    console.log(res);
});

// Delete using mongoose's querying API
User.deleteOne({}).where('age').lte(1).exec((err, res) => {
    if (err)
        console.log(err);
    console.log(res);
});