// src/components/IncExpInfo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IncExpInfo = () => {
  const [incExpData, setIncExpData] = useState([]);
  const [categories, setCategories] = useState([]); // State to hold the list of categories
  const [newRecord, setNewRecord] = useState({
    AddedOn: '',
    CategoryName: '',
    TypeName: '',
    Amount: '',
    Remark: '',
  });

  // Predefined options for TypeName
  const typeOptions = ['Income', 'Expense'];

  // Fetch categories from the ExpenseCategories table
  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/income-expense-info')
      .then((response) => setIncExpData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const addRecord = () => {
    axios.post('http://localhost:5000/api/income-expense-info', newRecord)
      .then((response) => setIncExpData([...incExpData, response.data]))
      .catch((error) => console.error('Error adding record:', error));
  };

  const deleteRecord = (id) => {
    axios.delete(`http://localhost:5000/api/income-expense-info/${id}`)
      .then(() => setIncExpData(incExpData.filter((record) => record.Id !== id)))
      .catch((error) => console.error('Error deleting record:', error));
  };

  // Handle dropdown change for category
  const handleCategoryChange = (e) => {
    setNewRecord({ ...newRecord, CategoryName: e.target.value });
  };

  // Handle dropdown change for category
  const handleTypeChange = (e) => {
    setNewRecord({ ...newRecord, TypeName: e.target.value });
  };

  return (
    <div>
      <h1>Income/Expense Info</h1>
      <input
        type="date"
        value={newRecord.AddedOn}
        onChange={(e) => setNewRecord({ ...newRecord, AddedOn: e.target.value })}
        placeholder="Added On"
      />
      {/* <input
        type="text"
        value={newRecord.CategoryName}
        onChange={(e) => setNewRecord({ ...newRecord, CategoryName: e.target.value })}
        placeholder="Category Name"
      /> */}
      {/* <input
        type="text"
        value={newRecord.TypeName}
        onChange={(e) => setNewRecord({ ...newRecord, TypeName: e.target.value })}
        placeholder="Type Name"
      /> */}

      {/* Dropdown for TypeName with fixed values */}
      {/* <select value={newRecord.TypeName} onChange={handleTypeChange}>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select> */}

      <select value={newRecord.TypeName} onChange={handleTypeChange}>
        {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
      </select>

       {/* Dropdown for CategoryName */}
       <select value={newRecord.CategoryName} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.Id} value={category.Name}>
            {category.Name}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={newRecord.Amount}
        onChange={(e) => setNewRecord({ ...newRecord, Amount: e.target.value })}
        placeholder="Amount"
      />
      <input
        type="text"
        value={newRecord.Remark}
        onChange={(e) => setNewRecord({ ...newRecord, Remark: e.target.value })}
        placeholder="Remark"
      />
      <button onClick={addRecord}>Add Record</button>

      <ul>
        {incExpData.map((record) => (
          <li key={record.Id}>
            {record.AddedOn} | {record.TypeName} | {record.CategoryName} | ${record.Amount} | {record.Remark}
            <button onClick={() => deleteRecord(record.Id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncExpInfo;

