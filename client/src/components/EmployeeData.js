import React from 'react'
import { useEffect } from 'react'
import { useGlobalState, } from '../utils/GlobalStateContext'
import { EmployeeCardContainer } from './EmployeeCardContainer'


const EmployeeData = () => {
  const {currentSelectedNode} = useGlobalState()
  
  
  useEffect(() => {
    console.log('currentSelectedNode', currentSelectedNode)
  }, [currentSelectedNode])


  return (
    <div className='bg-slate-50 w-1/2 h-fit shadow-lg rounded-md p-8 border-slate border-2'>
        <h1 className='text-3xl font-semibold'>{currentSelectedNode['Name']}</h1>
        <div className='flex flex-row mt-12 gap-4 h-full'>
            {currentSelectedNode && (<EmployeeCardContainer employee={currentSelectedNode} />)}
        </div>
    </div>
  )
}

export default EmployeeData