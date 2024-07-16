const db = require("./db")

const buildTree = async () => {
    const employeesRes = await db.query('SELECT * FROM employees')
    const employees = employeesRes.rows
    const employeeDict = {}
    const managerDict = {}

    employees.forEach(employee => {
        employeeDict[employee['Employee Id']] = { ...employee, children: [] };
        const managerId = employee.Manager;
        if (managerDict[managerId]) {
          managerDict[managerId].push(employee['Employee Id']);
        } else {
          managerDict[managerId] = [employee['Employee Id']];
        }
      });

    const buildTreeRecursive = (managerId) => {
        if (!(managerId in managerDict)) {
          return [];
        }
        return managerDict[managerId].map(employeeId => {
          const employee = employeeDict[employeeId];
          employee.children = buildTreeRecursive(employee['Employee Id']);
          return employee;
        });
      };

      employeeDict[0].children = buildTreeRecursive(0);

        return employeeDict[0];
}

module.exports = buildTree;
