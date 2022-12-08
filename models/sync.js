// import mongoose
const mongoose = require('mongoose');
// create schema definition object using mapping notation
const schemaDefinition = {
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    oneLiner: {
        type: String,
        required: true
    },
    seeking: {
        type: String,
        default: 'Go with the flow'
    }
}
//create a new schema using the definition object
let schemaObj = new mongoose.Schema(schemaDefinition);
//create a new model using the schema object and export model
module.exports = mongoose.model('Sync', schemaObj);
//export model