const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./expenses.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    // Create ExpenseCategory table
    db.run(`CREATE TABLE IF NOT EXISTS ExpenseCategory (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL
    )`);

    // Create Type table
    db.run(`CREATE TABLE IF NOT EXISTS ExpenseTypes (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Typename TEXT NOT NULL
    )`);
    
    // Create Type table
    db.run(`CREATE TABLE IF NOT EXISTS IncExpInfo (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      AddedOn TEXT,
      CategoryName TEXT,
      TypeName TEXT,
      Amount DECIMAL(10, 2),
      Remark TEXT,
      FOREIGN KEY (CategoryName) REFERENCES ExpenseCategory(Name),
      FOREIGN KEY (TypeName) REFERENCES ExpenseTypes(Name)
    )`);
  }
});

module.exports = db;
