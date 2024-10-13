const db = require('./db');

const getAllIncExpInfo = (callback) => {
  db.all('SELECT * FROM IncExpInfo', [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

const getIncExpInfoById = (id, callback) => {
  db.get('SELECT * FROM IncExpInfo WHERE Id = ?', [id], (err, row) => {
    if (err) {
      return callback(err);
    }
    callback(null, row);
  });
};

const addIncExpInfo = (incExpInfo, callback) => {
  const { AddedOn, CategoryName, TypeName, Amount, Remark } = incExpInfo;
  db.run(
    'INSERT INTO IncExpInfo (AddedOn, CategoryName, TypeName, Amount, Remark) VALUES (?, ?, ?, ?, ?)',
    [AddedOn, CategoryName, TypeName, Amount, Remark],
    function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { Id: this.lastID });
    }
  );
};

const updateIncExpInfo = (id, incExpInfo, callback) => {
  const { AddedOn, CategoryName, TypeName, Amount, Remark } = incExpInfo;
  db.run(
    'UPDATE IncExpInfo SET AddedOn = ?, CategoryName = ?, TypeName = ?, Amount = ?, Remark = ? WHERE Id = ?',
    [AddedOn, CategoryName, TypeName, Amount, Remark, id],
    function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    }
  );
};

const deleteIncExpInfo = (id, callback) => {
  db.run('DELETE FROM IncExpInfo WHERE Id = ?', [id], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};

module.exports = {
  getAllIncExpInfo,
  getIncExpInfoById,
  addIncExpInfo,
  updateIncExpInfo,
  deleteIncExpInfo,
};
