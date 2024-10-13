const db = require('./db');

// Get all types
exports.getAllTypes = (callback) => {
  db.all('SELECT * FROM ExpenseTypes', [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// Add a new type
exports.addType = (typename, callback) => {
  db.run('INSERT INTO ExpenseTypes (Typename) VALUES (?)', [typename], function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null, { id: this.lastID, typename });
    }
  });
};

// Delete a type
exports.deleteType = (id, callback) => {
  db.run('DELETE FROM ExpenseTypes WHERE Id = ?', [id], (err) => {
    callback(err);
  });
};

exports.updateType = (id, typename, callback) => {
  db.run('UPDATE ExpenseTypes SET Typename = ? WHERE Id = ?', [typename, id], function (err) {
    if (err) return callback(err);
    callback(null, { message: 'Category updated successfully' });
  });
};
