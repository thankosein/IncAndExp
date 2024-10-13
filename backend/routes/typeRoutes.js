const express = require('express');
const router = express.Router();
const typeModel = require('../models/typeModel');

// Get all types
router.get('/', (req, res) => {
  typeModel.getAllTypes((err, types) => {
    if (err) {
      res.status(500).send('Error retrieving types');
    } else {
      res.json(types);
    }
  });
});

// Add a new type
router.post('/', (req, res) => {
  const { typename } = req.body;
  typeModel.addType(typename, (err, newType) => {
    console.log("tks");
    if (err) {
      res.status(500).send('Error adding type');
    } else {
      res.json(newType);
    }
  });
});

// Delete a type
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  typeModel.deleteType(id, (err) => {
    if (err) {
      res.status(500).send('Error deleting type');
    } else {
      res.status(200).send('Type deleted');
    }
  });
});

// PUT to update an existing category
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { typename } = req.body;
  typeModel.updateType(id, typename, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating category' });
    }
    res.json({ message: 'Category updated successfully' });
  });
});

module.exports = router;
