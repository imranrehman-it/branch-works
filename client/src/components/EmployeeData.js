import React, { useEffect } from 'react';
import { useGlobalState } from '../utils/GlobalStateContext';

import ContactInfo from './EmployeeDataComponenets/ContactInfo';
import CostInfo from './EmployeeDataComponenets/CostInfo';
import BusinessInfo from './EmployeeDataComponenets/BusinessInfo';
import HiearchyInfo from './EmployeeDataComponenets/HiearchyInfo';
import MetricSelection from './EmployeeDataComponenets/MetricSelection';
import SearchBar from './SearchBar';

const EmployeeData = ({ treeHead, employees }) => {
  const { currentSelectedNode, expandedNodes } = useGlobalState();

  const glassStyle = {
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10.1px)',
    WebkitBackdropFilter: 'blur(10.1px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  };

  useEffect(() => {
    console.log('currentSelectedNode', currentSelectedNode);
  }, [expandedNodes]);

  return (
    <div
      className='bg-slate-100 shadow-lg rounded-md p-4 border-slate flex flex-col gap-2 max-h-screen overflow-scroll sticky top-0 min-w-[20%] max-w-[20%]'
      style={glassStyle}
    >
      <SearchBar treeHead={treeHead} employees={employees} />
      {currentSelectedNode && <ContactInfo currentSelectedNode={currentSelectedNode} />}
      {currentSelectedNode && <CostInfo currentSelectedNode={currentSelectedNode} />}
      {currentSelectedNode && <BusinessInfo currentSelectedNode={currentSelectedNode} />}
      {currentSelectedNode && <MetricSelection />}
      <HiearchyInfo />
    </div>
  );
};

export default EmployeeData;
