const db = require("./db");

const getEmployees = async () => {
  try {
    const employeesRes = await db.query('SELECT * FROM employees');
    const employees = employeesRes.rows;
    console.log(employees);
    return employees;
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching employees');
  }
};

module.exports = getEmployees;
