// App.js
import React, { useState, useEffect } from 'react';
import useFetchEmployees from './hooks/fetchEmployees';
import Flow from './components/Flow';
import EmployeeData from './components/EmployeeData';
import googleIcon from './components/googleicon.png';

const App = () => {
  const { data, loading, error } = useFetchEmployees();
  const [treeHead, setTreeHead] = useState(null);

  useEffect(() => {
    console.log('data changed', data);
    if (data) {
      console.log(data);
      setTreeHead(data);
    }
  }, [data]);

  return (
    <div className="App p-4">
      <div className='flex flex-row items-center'>
        <img className='h-10'src={googleIcon}/>
        <h1 className='text-center text-xl font-semibold'>Google</h1>
      </div>

      <Flow treeHead={treeHead} />

      <div className='flex flex-row w-full h-[50vh] m-4 gap-4 '>
        <EmployeeData emp />
        {/* <EmployeeData /> */}
      </div>

    </div>
  );
};

export default App;
