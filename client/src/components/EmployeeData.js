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
    <div className=' bg-slate-50 w-1/2 h-full shadow-lg rounded-md p-8'>
        <h1 className='text-black text-3xl font-bold'>Employee Data</h1>
        <div className='flex flex-row mt-12'>
            <EmployeeCardContainer employee={currentSelectedNode} />
        </div>
    </div>
  )
}

export default EmployeeData