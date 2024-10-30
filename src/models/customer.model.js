const mongoose = require('mongoose');
const server = "localhost";
const database = "denormal_transaction";
const user = "user";
const password = "123123123";


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
