
import React from 'react';
import { useState, useEffect } from 'react';
export default function App() {

  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/localhost:3000/employees')
      .then((res) => res.json())
      .then((data) => console.log(data));
    
  }, []);

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}