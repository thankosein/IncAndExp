const db = require('./db');

const getAllCategories = (callback) => {
  db.all('SELECT * FROM ExpenseCategory', callback);
};

const getCategoryById = (id, callback) => {
  db.get('SELECT * FROM ExpenseCategory WHERE Id = ?', [id], callback);
};

const addCategory = (name, callback) => {
  db.run('INSERT INTO ExpenseCategory (Name) VALUES (?)', [name], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, name });
  });
};

const updateCategory = (id, name, callback) => {
  db.run('UPDATE ExpenseCategory SET Name = ? WHERE Id = ?', [name, id], function (err) {
    if (err) {       
      console.error('SQL Error:', err); // Log SQL error
      return callback(err);
    }
    callback(null, { message: 'Category updated successfully' });
  });
};

const deleteCategory = (id, callback) => {
  db.run('DELETE FROM ExpenseCategory WHERE Id = ?', [id], callback);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
