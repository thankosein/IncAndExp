const express = require('express');
const router = express.Router();
const categoryModel = require('../models/categoryModel');

// GET all categories
router.get('/', (req, res) => {
  categoryModel.getAllCategories((err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching categories' });
    }
    res.json(rows);
  });
});

// GET a single category by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  categoryModel.getCategoryById(id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching category' });
    }
    if (!row) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(row);
  });
});

// POST to add a new category
router.post('/', (req, res) => {
  const { Name } = req.body;
  categoryModel.addCategory(Name, (err, newCategory) => {
    if (err) {
      return res.status(500).json({ error: 'Error adding category' });
    }
    res.json(newCategory);
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Name } = req.body;
  
  categoryModel.updateCategory(id, Name, (err) => {
    if (err) {
      console.error('Error updating category:', err); // Log the actual error
      return res.status(500).json({ error: 'Error updating category' });
    }
    res.json({ message: 'Category updated successfully' });
  });
});


// DELETE to remove a category
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  categoryModel.deleteCategory(id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting category' });
    }
    res.json({ message: 'Category deleted successfully' });
  });
});

module.exports = router;
