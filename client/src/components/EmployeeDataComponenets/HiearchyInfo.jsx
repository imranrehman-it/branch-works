import React, { useEffect } from 'react'
import { useGlobalState } from '../../utils/GlobalStateContext';

const HiearchyInfo = () => {
    const {expandedNodes} = useGlobalState();

    useEffect(() => {
        console.log('expandedNodes', expandedNodes)
    }, [expandedNodes])
    
  return (
    <div className='flex flex-col w-full h-fit gap-2 bg-white shadow-lg rounded-md p-2'>
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
  )
}

export default HiearchyInfo