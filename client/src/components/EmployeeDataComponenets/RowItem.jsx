import React from 'react'

const RowItem = ({label, data, color }) => {
  return (
    <div className='w-full h-fit rounded-md flex flex-row p-2 justify-between'>
        <p className={`bg-${color}-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold`}>{label}</p>
        <p className={`w-fit h-fit px-2 py-1 rounded-md text-nowrap text-[0.6rem] shadow-md font-semibold outline-dotted outline-2 outline-${color}-300`}>{data}</p>
    </div>
  )
}

export default RowItem