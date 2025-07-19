const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true},
    unit: { type: String, required: true },
    category: { type: String },
    low_stock_threshold: { type: Number, default: 0 }
});

module.exports = mongoose.model('Item', itemSchema);
