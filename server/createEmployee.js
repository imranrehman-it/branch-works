const db = require('./db');

const createEmployee = async (employee) => {
  const query = `
    INSERT INTO employees (
      "Employee Id", "Name", "Job Title", "Email", "Manager", "Status", "Start Date", "Department",
      "Location", "Salary", "End Date", "Photo", "Performance", "Project", "Entity", "Skill", "Source",
      level, "Business Pillar", "Business Sector", "Job Family", "Job Family Group", "Company Cluster",
      "Company", "Company Hierarchy", "Cost Center", "Management Level", "Person Type", "Employee Type",
      "Work Shift", country, gender, age
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
      $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33
    )
    RETURNING *;
  `;

  const values = [
    employee ['Employee Id'], 
    employee['Name'], employee['Job Title'], employee['Email'], employee['Manager'], employee['Status'],
    employee['Start Date'], employee['Department'], employee['Location'], employee['Salary'], employee['End Date'],
    employee['Photo'], employee['Performance'], employee['Project'], employee['Entity'], employee['Skill'],
    employee['Source'], employee['level'], employee['Business Pillar'], employee['Business Sector'],
    employee['Job Family'], employee['Job Family Group'], employee['Company Cluster'], employee['Company'],
    employee['Company Hierarchy'], employee['Cost Center'], employee['Management Level'], employee['Person Type'],
    employee['Employee Type'], employee['Work Shift'], employee['country'], employee['gender'], employee['age']
  ];

  try {
    const res = await db.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error('Error inserting employee:', err);
    throw err;
  }
};

module.exports = createEmployee;
