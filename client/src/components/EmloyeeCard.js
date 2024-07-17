import React, { useEffect, useState} from 'react';
import { Handle, Position } from '@xyflow/react';
import { useGlobalState } from '../utils/GlobalStateContext';
import createNodeArray from '../utils/createNodes';
import removeNodes from '../utils/removeNodes';
import { updateExpandedNodes, updateNodesAndEdges, appendNodesAndEdges } from '../utils/nodeState';



const EmployeeCard = ({isConnectable, data}) => {
    const { nodes, setNodes, edges, setEdges, expandedNodes, setExpandedNodes, setCurrentSelectedNode } = useGlobalState();
    const [expanded, setExpanded] = useState(false);
    const employee = data.employee;

  
    const expandNode = () => {
      setCurrentSelectedNode(employee);
      if (employee && employee['children'].length > 0) {

        setExpanded(true);

        if (expandedNodes[employee['level']]) {
          //remove all children of the expanded node that is set of the level
          const employeeToRemove = expandedNodes[employee['level']];
          const { nodes: adjustedNodes, edges: adjustedEdges } = removeNodes(employeeToRemove, nodes, edges);
          updateNodesAndEdges(setNodes, setEdges, adjustedNodes, adjustedEdges);
          updateExpandedNodes(setExpandedNodes, employee, employee['level']);

          //get the node data of the current node we are expanding and create new nodes and edges
          const node = nodes.find((n) => n.id === employee['Employee Id'].toString());
          const { nodes: newNodes, edges: newEdges } = createNodeArray(employee, node.position.x, node.position.y);
          appendNodesAndEdges(setNodes, setEdges, newNodes, newEdges);

        } else {
          //get the node data of the current node we are expanding and create new nodes and edges
          updateExpandedNodes(setExpandedNodes, employee, employee['level']);
          const node = nodes.find((n) => n.id === employee['Employee Id'].toString());
          const { nodes: newNodes, edges: newEdges } = createNodeArray(employee, node.position.x , node.position.y);
          appendNodesAndEdges(setNodes, setEdges, newNodes, newEdges);
        }
      }
    }

    const collapseNode = () => {
      setExpanded(false);
      const { nodes: newNodes, edges: newEdges } = removeNodes(employee, nodes, edges);
      setNodes(newNodes);
      setEdges(newEdges);
      expandNode();
    };
  


    const expandEmployee = () => {
        if (expanded) {
          collapseNode();
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
        <h1 className='text-black text-nowrap text-left text-lg font-semibold mt-3'>{employee['Name']}</h1>
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