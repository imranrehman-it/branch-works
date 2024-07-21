import React, { createContext, useState, useContext, useEffect } from 'react';
import {createNodeArray, } from './createNodes';
import removeNodes from './removeNodes';
import { updateExpandedNodes, appendNodesAndEdges } from './nodeState';

// Create a context object
const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [currentSelectedNode, setCurrentSelectedNode] = useState(null);
  const [searchPath, setSearchPath] = useState([]);

  useEffect(() => {
    console.log('nodes have been expanded');
  }, [expandedNodes]);

  useEffect(() => {
    console.log('nodes have been updated', nodes);
  }, [nodes]);


  useEffect(() => {
    console.log('searchPath', searchPath);
    if (searchPath.length != 0) {
      collapseNode(searchPath[0]);
    }
    searchPath.forEach((employee, index) => {
      setTimeout(() => {
        setNodes(currentNodes => {
          const node = currentNodes.find((n) => n.id === employee['Employee Id'].toString());
          if (!node) {
            console.error('Node not found');
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
      
    }, index * 100);
    });

  }, [searchPath])

  const expandNode = (employee) => {
    setCurrentSelectedNode(employee);
    if (employee && employee['children'].length > 0) {
      if (expandedNodes[employee['level']]) {
        // Remove all children of the expanded node that is set at the level
        const employeeToRemove = expandedNodes[employee['level']];
        const { nodes: adjustedNodes, edges: adjustedEdges } = removeNodes(employeeToRemove, nodes, edges);
        setNodes(adjustedNodes);
        setEdges(adjustedEdges);
        updateExpandedNodes(setExpandedNodes, employee, employee['level']);

        // Get the node data of the current node we are expanding and create new nodes and edges
        const node = nodes.find((n) => n.id === employee['Employee Id'].toString());
        if (!node) {
          console.error('Node not found');
          return;
        }
        console.log('node expanded', node);
        const { nodes: newNodes, edges: newEdges } = createNodeArray(employee, node.position.x, node.position.y);
        setNodes((currentNodes) => [...currentNodes, ...newNodes]);
        setEdges((currentEdges) => [...currentEdges, ...newEdges]);
        return { nodes: newNodes, edges: newEdges };

      } else {
        // Get the node data of the current node we are expanding and create new nodes and edges
        updateExpandedNodes(setExpandedNodes, employee, employee['level']);
        const node = nodes.find((n) => n.id === employee['Employee Id'].toString());
        if (!node) {
          console.error('Node not found');
          return;
        }
        const { nodes: newNodes, edges: newEdges } = createNodeArray(employee, node.position?.x, node.position?.y);
        appendNodesAndEdges(setNodes, setEdges, newNodes, newEdges);
      }
    }
    else{
      console.log('No children found');
    }
  };


  const collapseNode = (employee) => {
    const node = nodes.find((n) => n.id === employee['Employee Id'].toString());
    if (!node) {
      console.error('Node not found');
      return;
    }
    setExpandedNodes((currentExpandedNodes) => {
      const newExpandedNodes = { ...currentExpandedNodes };
      delete newExpandedNodes[employee['level']];
      return newExpandedNodes;
    });
    const { nodes: newNodes, edges: newEdges } = removeNodes(employee, nodes, edges);
    setNodes(newNodes);
    setEdges(newEdges);
  };

  return (
    <GlobalStateContext.Provider
      value={{ nodes, setNodes, edges, setEdges, expandedNodes, setExpandedNodes, currentSelectedNode, setCurrentSelectedNode, searchPath, setSearchPath, expandNode, collapseNode }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      'useGlobalState must be used within a GlobalStateProvider'
    );
  }
  return context;
};
