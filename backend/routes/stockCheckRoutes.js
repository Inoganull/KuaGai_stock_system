const express = require('express');
const router = express.Router();
const StockCheck = require('../models/StockCheck');

router.get('/', async (req, res) => {
    try {
        const { date } = req.query;

        let query = {};
        if (date) {
            const start = new Date(date);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);
            query.date = { $gte: start, $lte: end };
        }

        const result = await StockCheck.find(query).populate('item').sort({ date: -1 });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
    
router.post('/', async (req, res) => {
    const { item, quantity_checked } = req.body;

    if (!item || quantity_checked === undefined) {
        return res.status(400).json({ error: 'Item and quantity_checked are required' });
    }

    if (quantity_checked < 0) {
        return res.status(400).json({ error: 'Quantity checked cannot be negative' });
    }

    try {
        const entry = new StockCheck({ item, quantity_checked });
        await entry.save();
        res.status(201).json(entry);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save stock check' });
    }
});
    
module.exports = router;
