import React, { useEffect } from 'react'
import { useGlobalState } from '../../utils/GlobalStateContext';
import RowItem from './RowItem';

const HiearchyInfo = () => {
    const {expandedNodes} = useGlobalState();

    useEffect(() => {
        console.log('$$% expandedNodes', expandedNodes)
    }, [expandedNodes])

  return (
    <div className='flex flex-col w-full h-fit gap-2 bg-white shadow-lg rounded-md p-2'>
    <h1 className='text-black text-nowrap text-lg font-semibold mb-2 px-2'>Current Hierarchy</h1>
    {
      Object.values(expandedNodes[0] || {}).map(node => {
        if (node && node.Name) {
          return (
            <RowItem
              key={node.id}  // Ensure you have a unique key for each RowItem
              label={'Level ' + node['level']}
              data={node['Name']}
              color={'blue'}
            />
          );
        }
        return null;
      })
    }
  </div>
  
    )
}

export default HiearchyInfo