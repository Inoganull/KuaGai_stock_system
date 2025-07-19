const mongoose = require('mongoose');

const stockCheckSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity_checked: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StockCheck', stockCheckSchema);