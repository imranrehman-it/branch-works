import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import EmployeeCard from './EmloyeeCard';
import createNodeArray from '../utils/createNodes';

const nodeTypes = { employeeCard: EmployeeCard };

const Flow = ({ treeHead }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    if (treeHead) {
      const { nodes: newNodes, edges: newEdges } = createNodeArray(treeHead, 0, 0);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [treeHead]); // Only re-run effect if treeHead changes

  const expandEmployee = () => {
    console.log('expand employee with id=1');
    
    if (treeHead && treeHead.children && treeHead.children.length > 0) {
      //find node in nodes array with id=1 
      const node = nodes.find((n) => n.id === '1');
      console.log('node', node);
      const { nodes: newNodes, edges: newEdges } = createNodeArray(treeHead.children[0], node.position.x, node.position.y);
      setNodes((currentNodes) => [...currentNodes, ...newNodes]);
      setEdges((currentEdges) => [...currentEdges, ...newEdges]);
    }
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  return (
    <div style={{ height: '50%' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      <button onClick={expandEmployee}>
        Expand employee with id=1
      </button>
    </div>
  );
};

export default Flow;
