const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const categoryRoutes = require('./routes/categoryRoutes');
const typeRoutes = require('./routes/typeRoutes');
const incExpInfoRoutes = require('./routes/incExpInfoRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/types', typeRoutes);
app.use('/api/income-expense-info', incExpInfoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
