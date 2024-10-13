import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Type = () => {
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState('');
  const [editingId, setEditingId] = useState(null);  // Track which type is being edited
  const [editedName, setEditedName] = useState('');  // Track the new name of the type being edited

  useEffect(() => {
    axios.get('http://localhost:5000/api/types')
      .then((response) => setTypes(response.data))
      .catch((error) => console.error('Error fetching types:', error));
  }, []);

  const addType = () => {
    axios.post('http://localhost:5000/api/types', { typename: newType })
      .then((response) => setTypes([...types, response.data]))
      .catch((error) => console.error('Error adding type:', error));
  };

  // Enable editing mode for a category
  const enableEditing = (id, currentName) => {
    setEditingId(id);  // Set the ID of the category being edited
    setEditedName(currentName);  // Set the current category name in the input field
  };

  // Save the edited category
  const saveEdit = (id) => {
    axios.put(`http://localhost:5000/api/types/${id}`, { typename: editedName })
      .then((response) => {
        setTypes(types.map((typeInfo) =>
          typeInfo.Id === id ? { ...typeInfo, typename: editedName } : typeInfo
        )
      );
        setEditingId(null);  // Reset editing state
        setEditedName('');  // Clear edited name field
      })
      .catch((error) => console.error('Error updating category:', error));
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditedName('');
  };


  const deleteType = (id) => {
    axios.delete(`http://localhost:5000/api/types/${id}`)
      .then(() => setTypes(types.filter((type) => type.Id !== id)))
      .catch((error) => console.error('Error deleting type:', error));
  };

  return (
    <div>
      <h1>Types</h1>
      <input
        type="text"
        value={newType}
        onChange={(e) => setNewType(e.target.value)}
        placeholder="New Type"
      />
      <button onClick={addType}>Add Type</button>

      {/* <ul>
        {types.map((type) => (
          <li key={type.Id}>
            {type.Typename}
            <button onClick={() => deleteType(type.Id)}>Delete</button>
          </li>
        ))}
      </ul> */}

<ul>
        {types.map((typeinfo) => (
          <li key={typeinfo.Id}>
            {/* If this category is being edited, show input field */}
            {editingId === typeinfo.Id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button onClick={() => saveEdit(typeinfo.Id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {typeinfo.Typename}
                <button onClick={() => enableEditing(typeinfo.Id, typeinfo.Typename)}>Edit</button>
                <button onClick={() => deleteType(typeinfo.Id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Type;
