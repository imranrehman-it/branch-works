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
      createNewFlow(data);
    } 
  }, [data]);

  useEffect(() => {
    if (employeesData) {
      setEmployees(employeesData);
    }
  }, [employeesData]);

  // useEffect(() => {
  //   switch (flows.length) {
  //     case 1:
  //       setGridClass('grid-cols-1 grid-rows-1');
  //       break;
  //     case 2:
  //       setGridClass('grid-cols-2 grid-rows-1');
  //       break;
  //     case 3:
  //     case 4:
  //       setGridClass('grid-cols-2 grid-rows-2');
  //       break;
  //     default:
  //       setGridClass('grid-cols-1 grid-rows-1'); // Default to single column/row for more than 4 items
  //   }
  // }, [flows]);



  return (
    <div className="App p-4 flex flex-col  w-screen items-center">
      <div className='flex flex-row w-[100%] h-full gap-4'>
        <div className={`flex flex-wrap w-full h-full gap-4`}>
          {flows?.map((flow) => (
            <Flow key={flow.id} treeHead={flow.head} id={flow.id}/>
          ))}
        </div>
        {treeHead && (<EmployeeData treeHead={treeHead} employees={employees}/>)}
      </div>
    </div>
  );
};

export default App;
