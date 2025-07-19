const express = require('express');
const router = express.Router();
const StockIn = require('../models/StockIn');

router.get('/', async (req, res) => {
    const list = await StockIn.find().populate('item');
    res.json(list);
});

router.post('/', async (req, res) => {
    const entry = new StockIn(req.body);
    await entry.save();
    res.status(201).json(entry);
});

module.exports = router;