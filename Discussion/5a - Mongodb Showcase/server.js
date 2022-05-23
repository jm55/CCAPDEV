import 'dotenv/config';
// or in CommonJS:
// const dotenv = require('dotenv');
// dotenv.config();
import { connectToMongo, getDb } from './db/conn.js';

connectToMongo((err) => {
    if (err) {
        console.log("error occurred:");
        console.error(err);
        process.exit();
    }
    console.log("Succesfully connected to MongoDB");

    const db = getDb();
    const showcase = db.collection('users');
    
    //// Instructions: Uncomment the method calls one-by-one to test them out
    //// Note that the operations are performed asynchronously,
    //// so it is possible for them to be executed not in order


    // // Insert one
    // showcase.insertOne({
    //         firstname: 'Neil',
    //         subject: 'CCAPDEV',
    //         position: 'faculty'
    //     }).then(val => {
    //         console.log("Insert op successful: ");
    //         console.log(val);
    //     }).catch(err => {
    //         console.log("Insert op error: " + err);
    //     });

    // // Insert many
    // const data = [
    //     {
    //         firstname: 'Bob',
    //         lastname: 'Bobson',
    //         subject: 'CCPROG1',
    //         position: 'student'
    //     },
    //     {
    //         firstname: 'Jimmy',
    //         subject: ['CCPROG3', 'CCAPDEV', 'CSNETWK'],
    //         position: 'faculty'
    //     }
    // ];
    // showcase.insertMany(data)
    //     .then(val => {
    //         console.log("InsertMany op successful: ");
    //         console.log(val);
    //     }).catch(err => {
    //         console.log("InsertMany op error: " + err);
    //     });

    // // Update One
    // showcase.updateOne(
    //     {firstname: 'Bob'},
    //     {$set: {
    //         lastname: 'McBob'
    //     }}).then( val => {
    //         console.log("updateOne op successful: ");
    //         console.log(val)
    //     }).catch(err => {
    //         console.log("updateOne op error: " + err);
    //     });
    
    // // Update Many
    // showcase.updateMany(
    //     {subject: 'CCAPDEV'},
    //     {$set: {
    //         position: 'web_faculty'
    //     }}).then( val => {
    //         console.log("updateMany op successful: ");
    //         console.log(val)
    //     }).catch(err => {
    //         console.log("updateMany op error: " + err);
    //     });

    // // Delete One
    // showcase.deleteOne({firstname: 'Neil'})
    //     .then(val => {
    //         console.log("deleteOne op successful: ");
    //         console.log(val)
    //     }).catch(err => {
    //         console.log("deleteOne op error: " + err);
    //     });

    // // Delete Many
    // showcase.deleteMany({subject: 'CCPROG1'})
    //     .then(val => {
    //         console.log("deleteMany op successful: ");
    //         console.log(val)
    //     }).catch(err => {
    //         console.log("deleteMany op error: " + err);
    //     });

    // // Find One
    // showcase.findOne({firstname: "Jimmy"}).then(val => {
    //     console.log("findOne op successful:");
    //     console.log(val);
    // }).catch(err => {
    //     console.log("findOne op error: " + err);
    // })

    // // Find Many
    // const docsWithCCAPDEV = showcase.find()
    // docsWithCCAPDEV.toArray().then((arr) => {
    //     console.log("find op successful:");
    //     console.log(arr);
    // });
});