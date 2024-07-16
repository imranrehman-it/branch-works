// App.js
import React, { useState, useEffect } from 'react';
import useFetchEmployees from './hooks/fetchEmployees';
import Flow from './components/Flow';

const App = () => {
  const { data, loading, error } = useFetchEmployees();
  const [treeHead, setTreeHead] = useState(null);

  useEffect(() => {
    if (data) {
      console.log(data);
      setTreeHead(data);
    }
  }, [data]);

  return (
    <div className="App w-screen h-screen">
      <h1 className="text-3xl font-bold underline test">Hello world!</h1>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error.message}</p>}

      {treeHead && <p>{treeHead['Name']}</p>}

      <Flow treeHead={treeHead} />

    </div>
  );
};

export default App;
