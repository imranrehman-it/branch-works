import React from 'react'

const BusinessInfo = ({currentSelectedNode}) => {
  return (
    <div id='business' className='flex flex-col w-full h-fit bg-white shadow-lg rounded-md p-2'>
            <h1 className='text-black text-nowrap text-lg font-semibold mb-2 px-2'>Business</h1>
            <div className='w-full h-fit rounded-md flex flex-row p-2 justify-between'>
                <p className='bg-red-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold'>Pillar</p>
                <p className=' w-fit h-fit px-2 py-1 rounded-md text-nowrap text-[0.6rem] shadow-md font-semibold outline-dotted outline-2 outline-red-300'>{currentSelectedNode['Business Pillar']}</p>
                
            </div>
            <div className='w-full h-fit  rounded-md flex flex-row p-2 justify-between'>
                <p className='bg-red-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold'>Sector</p>
                <p className=' w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold outline-dotted outline-2 outline-red-300'>{currentSelectedNode['Business Sector']}</p>
                
            </div>
            <div className='w-full h-fit  rounded-md  flex flex-row p-2 justify-between'>
                <p className='bg-red-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold'>Project</p>
                <p className=' w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold outline-dotted outline-2 outline-red-300'>{currentSelectedNode['Project']}</p>
                
            </div>
            <div className='w-full h-fit  rounded-md  flex flex-row p-2 justify-between'>
                <p className='bg-red-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold'>Department</p>
                <p className=' w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold outline-dotted outline-2 outline-red-300'>{currentSelectedNode['Department']}</p>
                
            </div>

        </div>
  )
}

export default BusinessInfo