const mongoose = require('mongoose');
const server = "localhost";
const database = "customer";
const user = "customerAdmin";
const password = "customerAdmin";

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`);

let CustomerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Customer',CustomerSchema);