// src/components/IncExpInfo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Icons for save, cancel, edit, delete

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

  // State for error messages
  const [error, setError] = useState(''); 

  // Predefined options for TypeName
  const typeOptions = ['Expense', 'Income'];

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

  // Validation function
  const validateInputs = () => {
    if (!newRecord.CategoryName) {
      setError('Please select a category.');
      return false;
    }
    if (!newRecord.Amount) {
      setError('Amount is blank. Please enter an amount.');
      return false;
    }
    
    setError(''); // Clear error if validation passes
    return true;
  };

  // const addRecord = () => {
  //   // Validate inputs before adding record
  //   if (!validateInputs()) return;

  //   axios.post('http://localhost:5000/api/income-expense-info', newRecord)
  //     .then((response) => setIncExpData([...incExpData, response.data]))
  //     .catch((error) => console.error('Error adding record:', error));
  // };

  const addRecord = () => {
    // Validate inputs before adding record
    if (!validateInputs()) return;

    axios.post('http://localhost:5000/api/income-expense-info', newRecord)
      .then((response) => {
        console.log('Response data:', response.data); // Log the response data
        setIncExpData([...incExpData, response.data]);
        // Clear the form after adding
        setNewRecord({
          AddedOn: '',
          CategoryName: '',
          TypeName: '',
          Amount: '',
          Remark: '',
        });
        setError(''); // Clear any previous error
      })
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
    <div className="max-w-full mx-auto px-8 py-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Expense Categories</h1>      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
      <input
        type="date"
        value={newRecord.AddedOn}
        onChange={(e) => setNewRecord({ ...newRecord, AddedOn: e.target.value })}
        placeholder="Added On"
        className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/4"
      />

      <select 
        value={newRecord.TypeName} 
        onChange={handleTypeChange}
        className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3"
      >
        {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
      </select>

       {/* Dropdown for CategoryName */}
       <select 
        value={newRecord.CategoryName} 
        onChange={handleCategoryChange}
        className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/2"
      >
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
        className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/4"
      />
      <input
        type="text"
        value={newRecord.Remark}
        onChange={(e) => setNewRecord({ ...newRecord, Remark: e.target.value })}
        placeholder="Remark"
        className="border border-gray-300 rounded-lg px-3 py-2 w-full"
      />
      <button 
        onClick={addRecord}
       className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add
      </button>
    </div>
      {/* <ul>
        {incExpData.map((record) => (
          <li key={record.Id}>
            {record.AddedOn} | {record.TypeName} | {record.CategoryName} | ${record.Amount} | {record.Remark}
            <button onClick={() => deleteRecord(record.Id)}>Delete</button>
          </li>
        ))}
      </ul> */}

<div className="space-y-4">
  {incExpData.map((record) => (
    <div key={record.Id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">Date: {record.AddedOn}</p>
        <p className="text-lg font-semibold">{record.TypeName}</p>
        <p className="text-gray-500 text-sm">{record.CategoryName}: $ {record.Amount}</p>  
        <p className="text-gray-500 text-sm">Remark: {record.Remark}</p>
      </div>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
        onClick={() => deleteRecord(record.Id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  ))}
</div>
    </div>
  );
};

export default IncExpInfo;

