import React from 'react'

const CostInfo = () => {
  return (
    <div id='costs' className='flex flex-col w-full h-fit bg-white shadow-lg rounded-md p-2'>
            <h1 className='text-black text-nowrap text-lg font-semibold mb-2 px-2'>Costs</h1>
            <div className='w-full h-fit rounded-md flex flex-row p-2 justify-between'>
                <p className='bg-green-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold'>Salary</p>
                <p className=' w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold outline-dotted outline-2 outline-green-300'>$757,000</p>
                
            </div>
            <div className='w-full h-fit  rounded-md flex flex-row p-2 justify-between'>
                <p className='bg-green-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold'>IC Cost</p>
                <p className=' w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold outline-dotted outline-2 outline-green-300'>$45.6M</p>
                
            </div>
            <div className='w-full h-fit  rounded-md  flex flex-row p-2 justify-between'>
                <p className='bg-green-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold'>Management Cost</p>
                <p className=' w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold outline-dotted outline-2 outline-green-300'>12.3M</p>
                
            </div>

        </div>
  )
}

export default CostInfo