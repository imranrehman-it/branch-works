// App.js
import React, { useState, useEffect } from 'react';
import useFetchEmployeeTree from './hooks/fetchEmployeeTree';
import useFetchEmployees from './hooks/fetchEmloyees';
import Flow from './components/Flow';
import EmployeeData from './components/EmployeeData';


const App = () => {
  const { data , loading, error } = useFetchEmployeeTree();
  const { data: employeesData, loading: employeesLoading, error: employeesError } = useFetchEmployees();
  const [treeHead, setTreeHead] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    console.log('data changed', data);
    if (data) {
      console.log(data);
      setTreeHead(data);
    }
  }, [data]);

  useEffect(() => {
    if (employeesData) {
      setEmployees(employeesData);
    }
  }, [employeesData]);

  return (
    <div className="App p-4 flex flex-col  w-screen items-center">
      <div className='flex flex-row w-[100%] h-full gap-4'>
        <div className='flex flex-col'>
          <Flow treeHead={treeHead} />
        </div>
        {treeHead && (<EmployeeData treeHead={treeHead} employees={employees}/>)}
      </div>
    </div>
  );
};

export default App;
