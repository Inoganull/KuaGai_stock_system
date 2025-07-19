const express = require('express');
const router = express.Router();
const StockCheck = require('../models/StockCheck');

router.get('/', async (req, res) => {
    const list = await StockCheck.find().populate('item').sort({ date: -1 });
    res.json(list);
});

router.post('/', async (req, res) => {
    const entry = new StockCheck(req.body);
    await entry.save();
    res.status(201).json(entry);
});

// Check later
// router.post('/', async (req, res) => {
//     try {
//       const stockCheck = new StockCheck({
//         item: req.body.item,
//         quantity_checked: req.body.quantity_checked
//       });
//       await stockCheck.save();
//       res.status(201).json(stockCheck);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   });
module.exports = router;
