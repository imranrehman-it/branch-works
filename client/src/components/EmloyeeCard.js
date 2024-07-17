import React, { useEffect, useState} from 'react';
import { Handle, Position } from '@xyflow/react';
import { useGlobalState } from '../utils/GlobalStateContext';
import createNodeArray from '../utils/createNodes';
import removeNodes from '../utils/removeNodes';



const EmployeeCard = ({isConnectable, data}) => {
    const { nodes, setNodes, edges, setEdges, expandedNodes, setExpandedNodes } = useGlobalState();
    const [expanded, setExpanded] = useState(false);


    const expandNode = () => {
      if (data.employee && data.employee['children'].length > 0) {
        setExpanded(true);
        if (expandedNodes[data.employee['level']]) {
          const employeeToRemove = expandedNodes[data.employee['level']];
          const { nodes: adjustedNodes, edges: adjustedEdges } = removeNodes(employeeToRemove, nodes, edges);
          setNodes(adjustedNodes);
          setEdges(adjustedEdges);
          setExpandedNodes((currentExpandedNodes) => ({
            ...currentExpandedNodes,
            [data.employee['level']]: data.employee,
          }));
          const node = nodes.find((n) => n.id === data.employee['Employee Id'].toString());
          const { nodes: newNodes, edges: newEdges } = createNodeArray(data.employee, node.position.x, node.position.y);
          setNodes([...adjustedNodes, ...newNodes]);
          setEdges([...adjustedEdges, ...newEdges]);
        } else {
          setExpandedNodes((currentExpandedNodes) => ({
            ...currentExpandedNodes,
            [data.employee['level']]: data.employee,
          }));
          const node = nodes.find((n) => n.id === data.employee['Employee Id'].toString());
          const { nodes: newNodes, edges: newEdges } = createNodeArray(data.employee, node.position.x , node.position.y);
          setNodes([...nodes, ...newNodes]);
          setEdges([...edges, ...newEdges]);
        }
      }
    }
  


    const expandEmployee = () => {
        if (expanded) {
          console.log('collapsing');
          setExpanded(false);
          const { nodes: newNodes, edges: newEdges } = removeNodes(data.employee, nodes, edges);
          setNodes(newNodes);
          setEdges(newEdges);
          expandNode();
          
        } else {
          expandNode();
        }
      };


  return (
    <>
     <Handle type="target" position={Position.Top} />
    <div onClick={expandEmployee} className="flex flex-col w-[15rem] h-[16rem] bg-white shadow-md rounded-md p-4 items-center">
      <div className='header flex flex-col items-center'>
        <p className='text-white text-center text-lg justify-around p-1 font-bold w-10 h-10 bg-black rounded-full absolute -translate-y-8'>IR</p>
        <h1 className='text-black text-nowrap text-left text-lg font-semibold mt-3'>{data.employee['Name']}</h1>
        <p className='text-black text-nowrap text-left text-sm'>CEO</p>
        <p className='bg-white w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold text-nowrap mt-1 shadow-inner'>Engineering</p>
      </div>
      <div className='flex flex-col items-center w-full h-full bg-white rounded-md mt-2 p-2'>
        <div className='flex flex-wrap w-full justify-center gap-1'>
          <p className='bg-purple-100 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] shadow-lg font-semibold text-nowrap'>📍Toronto, Canada</p>
          <p className='bg-blue-100 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold shadow-md text-nowrap'>Level: 1</p>
          <p className='bg-red-100 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold shadow-md text-nowrap'>Salary: 325,000</p>
          <p className='bg-green-100 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold shadow-md text-nowrap'>IC Cost: 126.7M</p>
          <p className='bg-green-100 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold shadow-md text-nowrap'>Gender: Male</p>
          <p className='bg-yellow-100 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold shadow-md text-nowrap'>Management Cost: 154.3M</p>
          <p className='bg-yellow-200 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold shadow-md text-nowrap'>🎉outstanding</p>
        </div>
      </div>
      <p className='bg-yellow-200 w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold shadow-md text-nowrap mt-2'>5</p>
    </div>
    <Handle type="source" position={Position.Bottom} id="a" />
    <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable='true'
      />
    </>
  );
};

export default EmployeeCard;