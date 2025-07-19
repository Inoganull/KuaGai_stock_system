const mongoose = require('mongoose');

const stockInSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity: { type: Number, required: true },
    notes: { type: String,},
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StockIn', stockInSchema);