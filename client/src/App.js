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
      <Flow treeHead={treeHead} />

      <div className='flex flex-row w-full h-[50vh] m-4 gap-4 '>
        <EmployeeData />
        {/* <EmployeeData /> */}
      </div>

    </div>
  );
};

export default App;
