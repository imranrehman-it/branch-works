import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useGlobalState } from '../utils/GlobalStateContext';
import Modal from './Modal';

const CreateEmployee = ({ data }) => {
  const { nodes, expandNode } = useGlobalState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [pillar, setPillar] = useState('');
  const [sector, setSector] = useState('');
  const [department, setDepartment] = useState('');
  const [project, setProject] = useState('');
  const [salary, setSalary] = useState('');
  const [workShift, setWorkShift] = useState('');

  const state = {
    employeeId,
    setEmployeeId,
    name,
    setName,
    jobTitle,
    setJobTitle,
    email,
    setEmail,
    location,
    setLocation,
    pillar,
    setPillar,
    sector,
    setSector,
    department,
    setDepartment,
    project,
    setProject,
    salary,
    setSalary,
    workShift,
    setWorkShift,
  };

  const insertEmployee = async () => {
    const employee = {
      "Employee Id": employeeId,
      "Name": name,
      "Job Title": jobTitle,
      "Email": email,
      "Manager": data.parent['Employee Id'],
      "Status": "Active",
      "Start Date": "2018-01-01T05:00:00.000Z",
      "Department": department,
      "Location": location,
      "Salary": `${salary}`,
      "End Date": null,
      "Photo": "https://ui-avatars.com/api/?name=Joan+Teyler&background=#f56417&color=fff",
      "Performance": "✅ Fair",
      "Project": project,
      "Entity": "Agentnoon EU Inc.",
      "Skill": "Creative Strategy",
      "Source": "Recruitee",
      "level": data.parent['level'] + 1,
      "Business Pillar": pillar,
      "Business Sector": sector,
      "Job Family": "Customer Operational Control",
      "Job Family Group": "Flight Operations",
      "Company Cluster": "Cluster N",
      "Company": "NCC NebulaWays Consulting China",
      "Company Hierarchy": "Corporate Communications",
      "Cost Center": "Legal-Contract Drafting",
      "Management Level": "Management",
      "Person Type": "Employee",
      "Employee Type": "Fixed Term - Local",
      "Work Shift": workShift,
      "country": "United Arab Emirates",
      "gender": "Male",
      "age": 45,
    };
  
    try{
      const response = await fetch('http://localhost:3001/insertEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         employee,
        }),
      });
      const data = await response.json();
      console.log(data);
      return data;

    }
    catch (error){
    }
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try{
      const employee = await insertEmployee();
      employee.children = [];
      employee['Total Descendants'] = 0;
      employee['Total Cost'] = 0;
      data.parent.children.push(employee);
      expandNode(data.parent, 0);
      setIsModalOpen(false);
    }
    catch (error){
      console.log(error);
    }
  };
    
  return (
    <>
      <Handle type="source" position={Position.Bottom} />
      <div className="flex flex-col w-[15rem] h-[20rem] bg-white shadow-md rounded-md p-4 items-center">
        <p className='text-center text-xl p-1 font-bold '>Create New Employee</p>
        <div className='flex flex-col items-center justify-center h-full'>
          <button onClick={handleClick} className='text-white text-center text-lg justify-around p-1 font-bold w-12 h-12 bg-black rounded-full'>+</button>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={true} />
      <Modal isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        handleSave={handleSave}
        state={state}
      />
    </>
  );
};

export default CreateEmployee;
