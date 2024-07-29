import {React, useState, useEffect, createContext, useContext} from 'react';
import { createNodeArray } from '../utils/createNodes';
import removeNodes from '../utils/removeNodes';

const NodesContext = createContext();

export const NodesProvider = ({children}) => {
    const [nodes, setNodes] = useState({});
    const [edges, setEdges] = useState({});
    const [expandedNodes, setExpandedNodes] = useState({});
    const [currentSelectedNode, setCurrentSelectedNode] = useState(null);

    const findNodeById = (id, flowId) => {
        const node = nodes[flowId]?.find((n) => n.id === id.toString());
        if (node) {
          return node;
        }
        throw new Error('Node not found');  
    }

    const updateNodeState = (employee, flowId) => {
        const node = findNodeById(employee['Employee Id'], flowId);
        const { nodes: newNodes, edges: newEdges } = createNodeArray(employee, node.position?.x, node.position?.y, flowId);
    
        setNodes((currentNodes) => ({
          ...currentNodes,
          [flowId]: [...(currentNodes[flowId] || []), ...newNodes],
        }));
    
        setEdges((currentEdges) => ({
          ...currentEdges,
          [flowId]: [...(currentEdges[flowId] || []), ...newEdges],
        }));
      };
    
      const expandNode = (employee, flowId) => {
        if (flowId === 0) {
          setCurrentSelectedNode(employee);
        }
        const employeeToRemove = expandedNodes[flowId]?.[employee['level']];
          if (employeeToRemove) {
            const { nodes: adjustedNodes, edges: adjustedEdges } = removeNodes(employeeToRemove, nodes, edges, flowId);
            setNodes((currentNodes) => ({
              ...currentNodes,
              [flowId]: adjustedNodes[flowId] || [],
            }));
            setEdges((currentEdges) => ({
              ...currentEdges,
              [flowId]: adjustedEdges[flowId] || [],
            }));
          }
          const value = {
            ...expandedNodes[flowId],
            [employee['level']]: employee,
          };
    
          setExpandedNodes((currentExpandedNodes) => ({
            ...currentExpandedNodes,
            [flowId]: value,
          }));
    
          updateNodeState(employee, flowId);
      };

      const collapseNode = (employee, flowId) => {
       findNodeById(employee['Employee Id'], flowId);
        const { nodes: newNodes, edges: newEdges } = removeNodes(employee, nodes, edges, flowId);
        setNodes((currentNodes) => ({
          ...currentNodes,
          [flowId]: newNodes[flowId] || [],
        }));
        setEdges((currentEdges) => ({
          ...currentEdges,
          [flowId]: newEdges[flowId] || [],
        }));
      };

    return (
        <NodesContext.Provider value={{
          nodes,
          setNodes,
          edges,
          setEdges,
          expandedNodes,
          setExpandedNodes,
          currentSelectedNode,
          setCurrentSelectedNode,
          updateNodeState,
          expandNode,
          collapseNode,
        }}>
          {children}
        </NodesContext.Provider>
      );
}

export const useNodes = () => useContext(NodesContext);