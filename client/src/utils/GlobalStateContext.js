import React, { createContext, useState, useContext, useEffect } from 'react';
import createNodeArray from './createNodes';
import removeNodes from './removeNodes';
import { updateExpandedNodes, updateNodesAndEdges, appendNodesAndEdges } from './nodeState';

// Create a context object
const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [currentSelectedNode, setCurrentSelectedNode] = useState(null);
  const [searchPath, setSearchPath] = useState([]);


  useEffect(()=>{
    console.log('nodes has been expanded');
  }, [expandedNodes])

  useEffect(() => {
    searchPath.forEach((employee) => {
      expandNode(employee);
    });
  }, [searchPath]);


  const expandNode = (employee, expand) => {
    setCurrentSelectedNode(employee);
    if (employee && employee['children'].length > 0) {


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

  const collapseNode = (employee, expand) => {
    const { nodes: newNodes, edges: newEdges } = removeNodes(employee, nodes, edges);
    setNodes(newNodes);
    setEdges(newEdges);
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

// Custom hook to use the global statex
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      'useGlobalState must be used within a GlobalStateProvider'
    );
  }
  return context;
};
