/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CgArrowsExpandUpRight } from "react-icons/cg";
import {useNodes} from '../context/NodeContext';
import { useFlows } from '../context/FlowsContext';


const EmployeeCard = ({ data }) => {
  const {currentSelectedNode, expandNode, expandedNodes } = useNodes();
  const { createNewFlow } = useFlows();
  const [isCurrentlyExpaded, setIsCurrentlyExpaded] = useState(true);
  const [selectedNode, setSelectedNode] = useState(false);
  const employee = data.employee;

  const expandTrigger = () =>{
    expandNode(employee, data.flowId);
  }

  const createFlow = () => {
    createNewFlow(employee);
  }

  const shortHandNumberConserion = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
  }

  useEffect(() => {
    setIsCurrentlyExpaded(expandedNodes && expandedNodes[data.flowId][employee['level']]=== employee);
  },[expandedNodes]);

  useEffect(() => {
    setSelectedNode(currentSelectedNode && currentSelectedNode['Employee Id'] === employee['Employee Id']);
  }, [currentSelectedNode, employee]);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <CgArrowsExpandUpRight onClick={createFlow} className='absolute -top-1 -right-1 tra text-3xl text-black cursor-pointer font-bold z-10 bg-blue-100 p-1 rounded-md' />
      <div
        onClick={expandTrigger}
        className={`flex flex-col w-[15rem] h-[20rem] shadow-md rounded-md p-4 items-center fixeds ${selectedNode ? 'bg-green-100' : 'bg-white'} cursor-pointer`}
      >
        <div className='header flex flex-col items-center'>
          <p className='text-white text-center text-lg justify-around p-1 font-bold w-10 h-10 bg-black rounded-full absolute -translate-y-8'>
            {employee['Name'][0]}
          </p>
          <h1 className='text-black text-nowrap text-left text-lg font-semibold mt-3'>{employee['Name']}</h1>
          <p className='text-black text-center text-sm'>{employee['Job Title']}</p>
          <p className='bg-white w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold text-nowrap mt-1 shadow-inner'>
            {employee['Project']}
          </p>
        </div>
        <div className={`flex flex-col items-center w-full h-fullrounded-md mt-2 p-2 ${selectedNode ? 'bg-green-50' : 'bg-slate-50'}`}>
          <div className={`flex flex-wrap w-full justify-center gap-1 ${selectedNode ? 'bg-green-50' : 'bg-slate-50'}`}>
            <p className='bg-purple-100 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] shadow-lg font-semibold text-nowrap'>
              📍{employee['Location']}
            </p>
            <p className='bg-blue-100 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold shadow-md text-nowrap'>
              Level: {employee['level']}
            </p>
            <p className='bg-red-100 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold shadow-md text-nowrap'>
              Salary: {employee['Salary']}
            </p>
            <p className='bg-green-100 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold shadow-md text-nowrap'>
              IC Cost: 126.7M
            </p>
            <p className='bg-yellow-100 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold shadow-md text-nowrap'>
              Management Cost: 154.3M
            </p>
            <p className='bg-yellow-200 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold shadow-md text-nowrap'>
              {employee['Performance']}
            </p>
            <p className='bg-green-200 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold shadow-md text-nowrap'>
              Total Cost: {shortHandNumberConserion(employee['Total Cost'])}
            </p>
          </div>
        </div>
          <p className={`${isCurrentlyExpaded ? 'bg-green-100' : 'bg-yellow-200'} w-fit px-3 py-1 z-10 h-fit rounded-full text-[1rem] font-semibold shadow-md text-nowrap absolute -bottom-2`}>
            {employee['children'].length} / {employee['Descendant Count']}
          </p>
        

      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable='true' />
    </>
  );
};

export default EmployeeCard;
