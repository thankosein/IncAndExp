// routes/incExpInfo.js
const express = require('express');
const router = express.Router();
const incExpInfoModel = require('../models/incExpInfoModel');

// Get all IncExpInfo records
router.get('/', (req, res) => {
  incExpInfoModel.getAllIncExpInfo((err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve records' });
    }
    res.json(rows);
  });
});

// Get a specific IncExpInfo record by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  incExpInfoModel.getIncExpInfoById(id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve record' });
    }
    res.json(row);
  });
});

// Add a new IncExpInfo record
router.post('/', (req, res) => {
  const incExpInfo = req.body;
  incExpInfoModel.addIncExpInfo(incExpInfo, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add record' });
    }
    res.status(201).json(result);
  });
});

// Update an existing IncExpInfo record
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const incExpInfo = req.body;
  incExpInfoModel.updateIncExpInfo(id, incExpInfo, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update record' });
    }
    res.status(200).json({ message: 'Record updated successfully' });
  });
});

// Delete an IncExpInfo record
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  incExpInfoModel.deleteIncExpInfo(id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete record' });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  });
});

module.exports = router;
