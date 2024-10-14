import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Icons for save, cancel, edit, delete

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
    axios.post('http://localhost:5000/api/categories', { Name: newCategory })
      .then((response) => {
        // Assuming response.data contains the newly created category object with an Id field
        setCategories([...categories, response.data]);
        setNewCategory(''); // Clear the input field after adding
      })
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
    <div className="max-w-full mx-auto px-8 py-4 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Expense Categories</h1>
    <div className="flex mb-4">

      {/* Form to add a new category */}
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New Category"
        className="border border-gray-300 rounded-l-md px-4 py-2 flex-grow focus:outline-none focus:border-blue-500"
      />
      <button 
        onClick={addCategory} 
        className="bg-blue-500 text-white rounded-r-md px-4 py-2 hover:bg-blue-600"
      >
        Add
      </button>
      </div>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.Id} className="flex justify-between items-center p-1 border border-gray-300 rounded-md">
            <div className="flex-grow">
              {editingCategoryId === category.Id ? (
                <>
                  <input
                    type="text"
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                    className="border border-gray-300 px-2 py-1 w-full"
                  />
                </>
              ):(
                <span className="text-gray-700">{category.Name}</span>
              )}            
            </div>
            {/* If this category is being edited, show input field */}
            {editingCategoryId === category.Id ? (
              <>
                <button 
                  onClick={() => saveEdit(category.Id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faSave} />
                </button>
                <button 
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => enableEditing(category.Id, category.Name)} 
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button 
                  onClick={() => deleteCategory(category.Id)} 
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
