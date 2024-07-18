import React from 'react'
import { useEffect } from 'react'
import { useGlobalState, } from '../utils/GlobalStateContext'
import { EmployeeCardContainer } from './EmployeeCardContainer'
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";


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
        <div id='contanct' className='w-full h-fit bg-white rounded-md shadow-sm flex flex-col gap-2 p-4 items-center'>

            <div className='flex w-12 h-12 bg-blue-300 rounded-md'>

            </div>
            <div className='flex flex-col items-center'>
                <p className='text-black text-nowrap text-left text-[0.8rem] font-semibold'>Joan Tyler</p>
                <p className='text-black text-nowrap text-left text-[0.6rem] font-semibold'>CEO <span className='font-medium text-blue-300'>@Agentnoon</span></p> 
            </div>
           
            <div className="flex flex-col w-full mt-5 gap-2">
                <div className='flex flex-row gap-2 items-center'>
                        <FaMapLocationDot className='bg-blue-300 p-1 rounded-md w-5 h-5 text-white' />
                        <p className='text-black text-nowrap text-left text-[0.6rem] font-semibold'>Toronto, Canada</p>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <MdEmail className='bg-blue-300 p-1 rounded-md w-5 h-5 text-white font' />
                        <p className='text-black text-nowrap text-left text-[0.6rem] font-semibold'>Imranisrehman@gmail.com</p>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <MdPhone className='bg-blue-300 p-1 rounded-md w-5 h-5 text-white' />
                        <p className='text-black text-nowrap text-left text-[0.6rem] font-semibold'>+1 (647)-999-9999</p>
                    </div>
                
            </div>

            <div className='flex flex-wrap gap-2 mt-4 w-fit'>
                <p className='bg-blue-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] font-semibold shadow-md text-nowrap'>Level: 1</p>
                <p className='bg-red-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] font-semibold shadow-md text-nowrap'>Fixed Term - Local</p>
                <p className='bg-green-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] font-semibold shadow-md text-nowrap'>👏 Exceeds Expectations</p>
            </div>

        </div>
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