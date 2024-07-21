import React, { useState, useCallback, useEffect } from 'react';
import googleIcon from './googleicon.png';
import { useGlobalState } from '../utils/GlobalStateContext';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,

} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import EmployeeCard from './EmloyeeCard';
import {createNodeArray}from '../utils/createNodes';
import searchNodeByName from '../utils/searchNode';

const nodeTypes = { employeeCard: EmployeeCard };

const Flow = ({ treeHead }) => {

  const { nodes, setNodes, edges, setEdges, setCurrentSelectedNode, setExpandedNodes, currentSelectedNode } = useGlobalState();



  useEffect(() => {
      if (treeHead) {
        const initialNode = {
          id: "0",
          data: { employee: treeHead },
          position: { x: 0, y: 0 },
          type: 'employeeCard',
        };
        setNodes([initialNode]);
        const { nodes: newNodes, edges: newEdges } = createNodeArray(treeHead, 0 , 0);
        setNodes((currentNodes) => [...currentNodes, ...newNodes]);
        setEdges(newEdges);
      }
      setCurrentSelectedNode(treeHead);
      setExpandedNodes({"1": treeHead});
    }, [treeHead]);



      
    
  const onNodesChange = useCallback(
    (changes) => setNodes((currentNodes) => applyNodeChanges(changes, currentNodes)),
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((currentEdges) => applyEdgeChanges(changes, currentEdges)),
    [setEdges],
  );

  

  
  // useEffect(() => {
  //   if (currentSelectedNode) {
  //     focusNode(currentSelectedNode);
  //   }

  // }, [currentSelectedNode]);

  return (
    
    <div className=' rounded-md bg-slate-50 shadow-lg' style={{ height: '100vh', width: '84vw' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView='zoomToFit'
        maxZoom={4}
        minZoom={0.2}
        defaultZoom={1}
      >
        <Background />
        <Controls position='top-right' />
      </ReactFlow>
    </div>
  );
};

export default Flow;
