const express = require('express');
const cors = require('cors');
const db = require('./db');
const buildTree = require('./buildTree');
const getEmployees = require('./getEmployees');
const createEmployee = require('./createEmployee');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // This middleware is crucial for parsing JSON bodies

// Debug Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Body:', req.body);
  next();
});

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

app.post('/insertEmployee', async (req, res) => {
  console.log('Hit endpoint /insertEmployee');
  console.log('req.body:', req.body); // Logging req.body
  const data = req.body.employee;
  try {
    const result = await createEmployee(data);
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
