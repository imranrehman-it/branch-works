import React, { createContext, useState, useContext, useEffect } from 'react';
import {createNodeArray, } from './createNodes';
import removeNodes from './removeNodes';
import { updateExpandedNodes, appendNodesAndEdges, updateNodesAndEdges } from './nodeState';


const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [nodes, setNodes] = useState({});
  const [edges, setEdges] = useState({});
  const [expandedNodes, setExpandedNodes] = useState({});
  const [currentSelectedNode, setCurrentSelectedNode] = useState(null);
  const [searchPath, setSearchPath] = useState([]);
  const [flows, setFlows] = useState([]);
  


  useEffect(() => {
    if (searchPath.length !== 0) {
      const lastNode = searchPath[searchPath.length - 1];
      const node = nodes[0].find((n) => n.id === lastNode['Employee Id'].toString());
      if (node) {
        setCurrentSelectedNode(lastNode);
        return;
      }
      collapseNode(searchPath[0]);
    }

    searchPath.forEach((employee) => {
        setNodes(currentNodes => {
          const node = currentNodes.find((n) => n.id === employee['Employee Id'].toString());
          if (!node) {
            return currentNodes;
          }
          setCurrentSelectedNode(employee);
          updateExpandedNodes(setExpandedNodes, employee, employee['level']);

          const { nodes: newNodes, edges: newEdges } = createNodeArray(employee, node.position.x, node.position.y);
          setEdges(currentEdges => {
            return [...currentEdges, ...newEdges];
          });
          return [...currentNodes, ...newNodes];
      });
    });

  }, [searchPath])

  const createNewFlow = (employee) => {
    const newFlow = {
      id: flows.length + 1,
      head: employee,
    };
    setFlows((currentFlows) => [...currentFlows, newFlow]);
  };

 
    

  const expandNode = (employee, flowId) => {
    setCurrentSelectedNode(employee);
    console.log('$$ expand trigger');
    if (employee && employee['children'].length > 0) {
        const employeeToRemove = expandedNodes[flowId][employee['level']];
        if (employeeToRemove) {
          console.log('$$ employee to remove', employeeToRemove);
          const { nodes: adjustedNodes, edges: adjustedEdges } = removeNodes(employeeToRemove, nodes, edges, flowId);
          setNodes((currentNodes) => ({
            ...currentNodes,
            [flowId]: adjustedNodes[flowId],
          }));
          setEdges((currentEdges) => ({
            ...currentEdges,
            [flowId]: adjustedEdges[flowId],
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

        const node = nodes[flowId].find((n) => n.id === employee['Employee Id'].toString());
        if (!node) {
          console.error('Node not found');
          return;
        }
        const { nodes: newNodes, edges: newEdges } = createNodeArray(employee, node.position?.x, node.position?.y, flowId);
        setNodes((currentNodes) => ({
          ...currentNodes,
          [flowId]: [...currentNodes[flowId], ...newNodes],
        }));
        setEdges((currentEdges) => ({
          ...currentEdges,
          [flowId]: [...currentEdges[flowId], ...newEdges],
        }));
      }
    else{
      console.log('No children found');
    }
  };
  


  const collapseNode = (employee, flowId) => {
    console.log('yay collapsing node', employee);
    const node = nodes[flowId].find((n) => n.id === employee['Employee Id'].toString());
    console.log('yay node found', node);
    if (!node) {
      console.error('Node not found');
      return;
    }
 
    const { nodes: newNodes, edges: newEdges } = removeNodes(employee, nodes, edges, flowId);
    setNodes((currentNodes) => ({
      ...currentNodes,
      [flowId]: newNodes[flowId],
    }));
    setEdges((currentEdges) => ({
      ...currentEdges,
      [flowId]: newEdges[flowId],
    }));
 
  };

  return (
    <GlobalStateContext.Provider
      value={{ nodes, setNodes, edges, setEdges, expandedNodes, setExpandedNodes, currentSelectedNode, setCurrentSelectedNode, searchPath, setSearchPath, expandNode, collapseNode, createNewFlow, flows, setFlows }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};


export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      'useGlobalState must be used within a GlobalStateProvider'
    );
  }
  return context;
};
