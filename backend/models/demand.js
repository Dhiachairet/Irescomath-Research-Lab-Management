const mongoose = require('mongoose');


const demandSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    equipement: String,
    debut: String,
    fin: String
});

const demandModel = mongoose.model('demand', demandSchema);
module.exports = demandModel;