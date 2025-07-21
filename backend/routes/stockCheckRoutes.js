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

// Get stock checks for a specific date
router.get('/', async (req, res) => {
    try {
      const { date } = req.query;
      if (!date) return res.status(400).json({ message: 'Date is required' });
  
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
  
      const result = await StockCheck.find({
        date: { $gte: start, $lte: end }
      }).populate('item');
  
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;
