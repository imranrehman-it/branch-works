import React from 'react'
import RowItem from './RowItem'

const CostInfo = ({currentSelectedNode}) => {
  return (
    <div id='costs' className='flex flex-col w-full h-fit bg-white shadow-lg rounded-md p-2'>
            <h1 className='text-black text-nowrap text-lg font-semibold mb-2 px-2'>Costs</h1>
            <RowItem label='Salary' data={currentSelectedNode['Salary']} color={'green'}/>
            <RowItem label='IC Cost' data={'$45.6M'} color={'green'}/>
            <RowItem label='Management Cost' data={'$12.3M'} color={'green'}/>
        </div>
  )
}

export default CostInfo