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

      const calculateTotalDescendants = (head) => {
        // Initialize totalDescendants for the current node
        head['Descendant Count'] = 0;
        // If the node has children, calculate descendants for each child
        if (head.children && head.children.length > 0) {
          head.children.forEach(child => {
            head['Descendant Count'] += calculateTotalDescendants(child);
          });
        } else {
          return 1;
        }
        return head['Descendant Count'] + 1; 
      };

      const calculateTotalCost = (head) =>{
        head['Total Cost'] = 0
        if(head.children.length > 0){
          head.children.forEach(child =>{
            head['Total Cost'] += calculateTotalCost(child)
          })
        }
        else{
          return parseFloat(head['Salary'].replace(/[$,]/g, '')) || 0;
        }
        return head['Total Cost'] + (parseFloat(head['Salary'].replace(/[$,]/g, '')) || 0);
    }
      
      // Assuming employeeDict[0] is the root node
      employeeDict[0].children = buildTreeRecursive(0);
      calculateTotalDescendants(employeeDict[0])
      calculateTotalCost(employeeDict[0])
      

      return employeeDict[0];
}

module.exports = buildTree;
