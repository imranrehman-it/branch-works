/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import { useGlobalState } from '../utils/GlobalStateContext';
import { IoIosCloseCircleOutline } from "react-icons/io";

import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import EmployeeCard from './EmloyeeCard';
import CreateEmployee from './CreateEmployee';
import { createNodeArray } from '../utils/createNodes';

const nodeTypes = { employeeCard: EmployeeCard, createEmployee: CreateEmployee };

const FlowComponent = ({ treeHead, id, name}) => {
  const { nodes, setNodes, edges, setEdges, setCurrentSelectedNode, setExpandedNodes, currentSelectedNode, flows, removeFlow } = useGlobalState();
  const reactFlowInstance = useReactFlow();
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    if (treeHead) {
      const initialNode = {
        id: treeHead['Employee Id'].toString(),
        data: { employee: treeHead, flowId: id },
        position: { x: 0, y: 0 },
        type: 'employeeCard',
      };

      setNodes((currentNodes) => ({
        ...currentNodes,
        [id]: [initialNode],
      }));
      const { nodes: newNodes, edges: newEdges } = createNodeArray(treeHead, 0, 0, id);
      setNodes((currentNodes) => ({
        ...currentNodes,
        [id]: [...currentNodes[id], ...newNodes],
      }));
      setEdges((currentEdges)=>(
        {
          ...currentEdges,
          [id]: [...newEdges]
        }
      ));
    }
    setCurrentSelectedNode(treeHead);

    const initValue = {
      [id]: 
        {
          [treeHead['level']]: treeHead
        }
    }
    console.log('init value', initValue);
    setExpandedNodes((currentExpandedNodes) => ({
      ...currentExpandedNodes,
      ...initValue  
    }));
  }, [treeHead, setCurrentSelectedNode, setExpandedNodes, setNodes, setEdges]);
  
  useEffect(() => {
    if(id !== 0){
      return;
    }

    if (currentSelectedNode) {
      const selectedNode = nodes[id]?.find((node) => node.id === currentSelectedNode['Employee Id'].toString());
      if (selectedNode) {
        //get curent zoom level
        const zoomLevel = reactFlowInstance.getZoom();
        
        reactFlowInstance.setCenter(selectedNode.position.x+125, selectedNode.position.y+500, { zoom: zoomLevel, animated: true, duration: 250 });
      }
    }
  }, [currentSelectedNode, reactFlowInstance]);


  useEffect(() => {
    if(treeHead['Employee Id'] !== 0){
      setDimensions({
        width: '49%',
        height: '60vh'
      });
    }
    else{
      if(flows.length > 0){
      setDimensions({
        width: '100%',
        height: '80vh'
      });
      }
      else{
        setDimensions({
          width: '100%',
          height: '100vh'
        });
      }
  }
  }, [flows, treeHead] );

  const removeCurrentFlow = () => {
    removeFlow(id);
  }

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((currentNodes) => {
        // Create a copy of the currentNodes to avoid direct mutation
        const newNodes = { ...currentNodes };
  
        // Apply changes to the relevant node arrays
        changes.forEach(change => {
          const nodeId = change.id;
  
          if (newNodes[nodeId]) {
            // Apply the changes to the specific node array
            newNodes[nodeId] = applyNodeChanges([change], newNodes[nodeId]);
          }
        });
  
        return newNodes;
      });
    },
    [setNodes]
  );
  

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((currentEdges) => {
        // Create a copy of the currentEdges to avoid direct mutation
        const newEdges = { ...currentEdges };
  
        // Apply changes to the relevant edge arrays
        changes.forEach(change => {
          const edgeId = change.id;
  
          if (newEdges[edgeId]) {
            // Apply the changes to the specific edge array
            newEdges[edgeId] = applyEdgeChanges([change], newEdges[edgeId]);
          }
        });
  
        return newEdges;
      });
    },
    [setEdges]
  );

  return (
    <div className='rounded-md bg-slate-50 shadow-lg transition-all duration-1000 ' style={dimensions}>
      <h1 className='absolute m-8 ml-16 z-10 text-lg font-semibold px-2 py-[0.06rem] rounded-md'>{name} Tree</h1>
      <IoIosCloseCircleOutline  onClick={removeCurrentFlow} className='absolute m-8 z-10 text-3xl  text-black cursor-pointer font-bold bg-red-100 px-2 rounded-md' />
      <ReactFlow
        nodes={nodes[id]}
        onNodesChange={onNodesChange}
        edges={edges[id]}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView='zoomToFit'
        maxZoom={4}
        minZoom={0.2}
        defaultZoom={0.5}
        title='Employee Hierarchy'
      >
        <Background />
        <Controls position='top-right' />
      </ReactFlow>
    </div>
  );
};

const Flow = ({ treeHead, id, name }) => (
  <ReactFlowProvider>
    <FlowComponent treeHead={treeHead} id={id} name={name} />
  </ReactFlowProvider>
);

export default Flow;
