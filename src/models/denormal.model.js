const mongoose = require('mongoose');
const server = "localhost";
const database = "denormal_transaction";
const user = "user";
const password = "123123123";

//mongoose.set('debug', true);
mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, { useCreateIndex: true });

let DenormalSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    id: { type: Number, required: true },
    t_id: { type: String, required: true },
    trx_id: { type: String, required: true },
    trx_id_operator: String,
    user_id: { type: Number, required: true },
    publisher_id: { type: Number, required: true },
    operator_id: { type: Number, required: true },
    user_phone: { type: String, required: true },
    user_status: { type: Number, required: true },
    publisher_name: { type: String, required: true },
    operator_name: { type: String, required: true },
    operator_type: { type: Number, required: true },
    accepted: { type: Number, required: true },
    amount: { type: Number, default: 0, required: true },
    item: { type: String, required: true },
    miscellaneus: String,
    error_code: String,
    merchant: String,
    data: String,
    created_at: { type: Date, default: Date.now, required: true },
    updated_at: { type: Date, default: Date.now, required: true },
    user_region: String,
    keyword: String
});

DenormalSchema.index({ id: 1, t_id: 1, trx_id: 1 }, { unique: true });

/*DenormalSchema.index({id:1});
DenormalSchema.index({t_id:1});
DenormalSchema.index({trx_id:1});*/

module.exports = mongoose.model('Denormal', DenormalSchema);
