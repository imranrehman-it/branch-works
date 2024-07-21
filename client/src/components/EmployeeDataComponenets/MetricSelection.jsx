import React from 'react';

export const MetricSelection = () => {
  const metrics = {
    "red": 'Salary',
    "blue": 'level',
    "purple": 'Location',
    "green": 'IC Cost',
    "green": 'Gender',
    "yellow": 'Management Cost',
    "yellow": 'Performance'
  };

  return (
    <div className='flex flex-col bg-white shadow-lg rounded-md p-2'>
    <h1 className='text-black text-nowrap text-lg font-semibold mb-2 px-2'>Metrics</h1>
    <div id='business' className='grid grid-cols-2 grid-rows-3 w-full h-fi mt-2  gap-4'>
        {Object.entries(metrics).map(([color, metric]) => (
           <label className={`flex items-center space-x-2 bg-${color}-100 rounded-md p-1`}>
           <input type='checkbox' className='form-checkbox' />
           <span className='text-[0.6rem] font-semibold'>{metric}</span>
         </label>
        ))}
    </div>
    </div>
  );
};

export default MetricSelection;
