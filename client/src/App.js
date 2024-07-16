// App.js
import React, { useState, useEffect } from 'react';
import useFetchEmployees from './hooks/fetchEmployees';

const App = () => {
  const { data, loading, error } = useFetchEmployees();
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    // Example of handling data received from useFetchEmployees
    if (data) {
      console.log(data);
      setEmployees(data); // Assuming you have a state variable to store data
    }
  }, [data]); // Only re-run the effect if data changes

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error.message}</p>}

      {employees && <p>{employees['Name']}</p>}

    </div>
  );
};

export default App;
