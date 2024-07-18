import React from 'react'
import RowItem from './RowItem'

const BusinessInfo = ({currentSelectedNode}) => {
  return (
    <div id='business' className='flex flex-col w-full h-fit bg-white shadow-lg rounded-md p-2'>
            <h1 className='text-black text-nowrap text-lg font-semibold mb-2 px-2'>Business</h1>
            <RowItem label='Pillar' data={currentSelectedNode['Business Pillar']} color={'red'}/>
            <RowItem label='Sector' data={currentSelectedNode['Business Sector']} color={'red'}/>
            <RowItem label='Project' data={currentSelectedNode['Project']} color={'red'}/>
            <RowItem label='Department' data={currentSelectedNode['Department']} color={'red'}/>
        </div>
  )
}

export default BusinessInfo