// App.js
import React, { useState, useEffect } from 'react';
import useFetchEmployees from './hooks/fetchEmployees';
import Flow from './components/Flow';
import EmployeeData from './components/EmployeeData';
import SearchBar from './components/SearchBar';
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
    <div className="App p-4 flex flex-col  w-screen items-center">
      {/* <div className='flex flex-row items-center w-[95%]'>
        <img className='h-10'src={googleIcon}/>
        <h1 className='text-center text-xl font-semibold'>Google</h1>
      </div> */}
      <SearchBar treeHead={treeHead}/>
      <div className='flex flex-row w-[100%] h-full gap-4'>
        <Flow treeHead={treeHead} />
        <EmployeeData />
        

      </div>

     

    </div>
  );
};

export default App;
