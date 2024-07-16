// App.js
import React, { useState, useEffect } from 'react';
import useFetchEmployees from './hooks/fetchEmployees';
import Flow from './components/Flow';

const App = () => {
  const { data, loading, error } = useFetchEmployees();
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    if (data) {
      console.log(data);
      setEmployees(data);
    }
  }, [data]);

  return (
    <div className="App w-screen h-screen">
      <h1 className="text-3xl font-bold underline test">Hello world!</h1>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error.message}</p>}

      {employees && <p>{employees['Name']}</p>}

      <Flow />

    </div>
  );
};

export default App;
