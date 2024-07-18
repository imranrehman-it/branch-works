import React from 'react'
import { useEffect } from 'react'
import { useGlobalState, } from '../utils/GlobalStateContext'

import ContactInfo from './EmployeeDataComponenets/ContactInfo'

const EmployeeData = () => {
  const {currentSelectedNode, expandedNodes} = useGlobalState()
  
  const glassStyle = {
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10.1px)',
    WebkitBackdropFilter: 'blur(10.1px)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  };
  
  useEffect(() => {
    console.log('currentSelectedNode', currentSelectedNode)
  }, [currentSelectedNode, expandedNodes])


  return (
    <div className='bg-slate-100 shadow-lg rounded-md p-4 border-slate w-[15%] flex flex-col gap-2' style={glassStyle}>
        <ContactInfo />
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


        <div id='business' className='flex flex-col w-full h-fit bg-white shadow-lg rounded-md p-2'>
            <h1 className='text-black text-nowrap text-lg font-semibold mb-2 px-2'>Business</h1>
            <div className='w-full h-fit rounded-md flex flex-row p-2 justify-between'>
                <p className='bg-red-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold'>Pillar</p>
                <p className=' w-fit h-fit px-2 py-1 rounded-md text-nowrap text-[0.6rem] shadow-md font-semibold outline-dotted outline-2 outline-red-300'>Expertise and Knowledge</p>
                
            </div>
            <div className='w-full h-fit  rounded-md flex flex-row p-2 justify-between'>
                <p className='bg-red-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold'>Sector</p>
                <p className=' w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold outline-dotted outline-2 outline-red-300'>Manufacturing</p>
                
            </div>
            <div className='w-full h-fit  rounded-md  flex flex-row p-2 justify-between'>
                <p className='bg-red-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold'>Project</p>
                <p className=' w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold outline-dotted outline-2 outline-red-300'>Aquisition</p>
                
            </div>
            <div className='w-full h-fit  rounded-md  flex flex-row p-2 justify-between'>
                <p className='bg-red-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold'>Department</p>
                <p className=' w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold outline-dotted outline-2 outline-red-300'>Data Analytics</p>
                
            </div>

        </div>

        <div id='business' className='flex flex-col w-full h-fit gap-2 bg-white shadow-lg rounded-md p-2'>
            <h1 className='text-black text-nowrap text-lg font-semibold mb-2 px-2'>Current Hiearchy</h1>
            {
               Object.keys(expandedNodes).map(key => {
                const node = expandedNodes[key];
                if (node && node.Name) {
                  return (
                     <div key={key} className='w-full h-fit rounded-md flex flex-row p-1 justify-between'>
                        <p className='bg-green-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold'>Level: {key}</p>
                        <div className='flex flex-row gap-1'>
                            <p className=' w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold outline-dotted outline-2 outline-green-300'>{node.Name}</p>
                            {/* <p className=' w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] shadow-md font-semibold outline-dotted outline-2 outline-blue-300'>{node['Job Title']}</p> */}
                        </div>
                    </div>
                  );
                }
                return null; // Return null for keys with no value or without a Name property
              })
            }
        </div>
       

    </div>

  )
}

export default EmployeeData