// App.js
import React, { useState, useEffect } from 'react';
import { useGlobalState } from './utils/GlobalStateContext';
import useFetchEmployeeTree from './hooks/fetchEmployeeTree';
import useFetchEmployees from './hooks/fetchEmloyees';
import Flow from './components/Flow';
import EmployeeData from './components/EmployeeData';



const App = () => {
  const {createNewFlow, flows} = useGlobalState();
  const { data , loading, error } = useFetchEmployeeTree();
  const { data: employeesData, loading: employeesLoading, error: employeesError } = useFetchEmployees();
  const [treeHead, setTreeHead] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [gridClass, setGridClass] = useState('');




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
      <div className='flex flex-row w-full min-h-screen h-fit gap-4'>
        <div className={`flex flex-col w-full min-h-screen h-fit gap-4 justify-center`}>
         {treeHead && (<Flow treeHead={treeHead} id={treeHead['Employee Id']} name={'Main'}/>)}
         <div className='flex flex-wrap w-full h-fit gap-4'>
          {flows?.map((flow) => (
              <Flow key={flow.id} treeHead={flow.head} id={flow.id} name={flow.head['Name']}/>
            ))}
         </div>
          
        </div>
        {treeHead && (<EmployeeData treeHead={treeHead} employees={employees}/>)}
      </div>
    </div>
  );
};

export default App;
