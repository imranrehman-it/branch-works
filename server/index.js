const express = require('express');
const db = require('./db');
const app = express();
const cors = require('cors');
const buildTree = require('./buildTree');
const getEmployees = require('./getEmployees');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Route to fetch all employees
app.get('/employees', async (req, res) => {
  console.log('Hit endpoint /employees');
  try {
    const result = await buildTree();
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/allEmployees', async (req, res) => {
  console.log('Hit endpoint /allEmployees');
  try {
    const employees = await getEmployees();
    return res.json({ data: employees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
