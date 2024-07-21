import React, { createContext, useState, useContext, useEffect } from 'react';
import {createNodeArray, } from './createNodes';
import removeNodes from './removeNodes';
import { updateExpandedNodes, appendNodesAndEdges, updateNodesAndEdges } from './nodeState';


const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [currentSelectedNode, setCurrentSelectedNode] = useState(null);
  const [searchPath, setSearchPath] = useState([]);


  useEffect(() => {
    const lastNode = searchPath[searchPath.length - 1];
    const node = nodes.find((n) => n.id === lastNode['Employee Id'].toString());
    if (searchPath.length !== 0) {
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

  const expandNode = (employee) => {
    setCurrentSelectedNode(employee);
    if (employee && employee['children'].length > 0) {
        const employeeToRemove = expandedNodes[employee['level']];
        if (employeeToRemove) {
          const { nodes: adjustedNodes, edges: adjustedEdges } = removeNodes(employeeToRemove, nodes, edges);
          updateNodesAndEdges(setNodes, setEdges, adjustedNodes, adjustedEdges);
        }
        updateExpandedNodes(setExpandedNodes, employee, employee['level']);
        const node = nodes.find((n) => n.id === employee['Employee Id'].toString());
        if (!node) {
          console.error('Node not found');
          return;
        }
        const { nodes: newNodes, edges: newEdges } = createNodeArray(employee, node.position?.x, node.position?.y);
        appendNodesAndEdges(setNodes, setEdges, newNodes, newEdges);
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
    updateExpandedNodes(setExpandedNodes, employee, employee['level']);
    const { nodes: newNodes, edges: newEdges } = removeNodes(employee, nodes, edges);
    updateNodesAndEdges(setNodes, setEdges, newNodes, newEdges);
    expandNode(employee);
  };

  return (
    <GlobalStateContext.Provider
      value={{ nodes, setNodes, edges, setEdges, expandedNodes, setExpandedNodes, currentSelectedNode, setCurrentSelectedNode, searchPath, setSearchPath, expandNode, collapseNode }}
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
