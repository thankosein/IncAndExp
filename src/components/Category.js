import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);  // Track which category is being edited
  const [editedCategoryName, setEditedCategoryName] = useState('');  // Track the new name of the category being edited

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const addCategory = () => {
    axios.post('http://localhost:5000/api/categories', { name: newCategory })
      .then((response) => setCategories([...categories, response.data]))
      .catch((error) => console.error('Error adding category:', error));
  };

  // Enable editing mode for a category
  const enableEditing = (id, currentName) => {
    setEditingCategoryId(id);  // Set the ID of the category being edited
    setEditedCategoryName(currentName);  // Set the current category name in the input field
  };

  // Save the edited category
  const saveEdit = (id) => {
    axios.put(`http://localhost:5000/api/categories/${id}`, { Name: editedCategoryName })
      .then((response) => {
        setCategories(categories.map((category) =>
          category.Id === id ? { ...category, Name: editedCategoryName } : category
        ));
        setEditingCategoryId(null);  // Reset editing state
        setEditedCategoryName('');  // Clear edited name field
      })
      .catch((error) => console.error('Error updating category:', error));
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingCategoryId(null);
    setEditedCategoryName('');
  };

  const deleteCategory = (id) => {
    axios.delete(`http://localhost:5000/api/categories/${id}`)
      .then(() => setCategories(categories.filter((category) => category.Id !== id)))
      .catch((error) => console.error('Error deleting category:', error));
  };

  return (
    <div>
      <h1>Expense Categories</h1>

      {/* Form to add a new category */}
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New Category"
      />
      <button onClick={addCategory}>Add Category</button>

      <ul>
        {categories.map((category) => (
          <li key={category.Id}>
            {/* If this category is being edited, show input field */}
            {editingCategoryId === category.Id ? (
              <>
                <input
                  type="text"
                  value={editedCategoryName}
                  onChange={(e) => setEditedCategoryName(e.target.value)}
                />
                <button onClick={() => saveEdit(category.Id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {category.Name}
                <button onClick={() => enableEditing(category.Id, category.Name)}>Edit</button>
                <button onClick={() => deleteCategory(category.Id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
