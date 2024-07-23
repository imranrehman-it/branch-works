import React, { createContext, useState, useContext, useEffect } from 'react';
import { createNodeArray } from './createNodes';
import removeNodes from './removeNodes';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [nodes, setNodes] = useState({});
  const [edges, setEdges] = useState({});
  const [expandedNodes, setExpandedNodes] = useState({});
  const [currentSelectedNode, setCurrentSelectedNode] = useState(null);
  const [searchPath, setSearchPath] = useState([]);
  const [flows, setFlows] = useState([]);

  const createNewFlow = (employee) => {
    const newFlow = {
      id: employee['Employee Id'],
      head: employee,
    };
    setFlows((currentFlows) => [...currentFlows, newFlow]);
  };

  const updateNodeState = (employee, flowId) => {
    const node = nodes[flowId]?.find((n) => n.id === employee['Employee Id'].toString());
    if (!node) {
      console.error('Node not found');
      return;
    }

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
    console.log('$$% flowid', flowId);
    if (flowId === 0) {
      setCurrentSelectedNode(employee);
    }

    if (employee && employee['children']?.length > 0) {
      const employeeToRemove = expandedNodes[flowId]?.[employee['level']];
      if (employeeToRemove) {
        console.log('$$ employee to remove', employeeToRemove);
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
    } else {
      console.log('No children found');
    }
  };

  const collapseNode = (employee, flowId) => {
    console.log('yay collapsing node', employee);
    const node = nodes[flowId]?.find((n) => n.id === employee['Employee Id'].toString());
    if (!node) {
      console.error('Node not found');
      return;
    }

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

  useEffect(() => {
    console.log('search path', searchPath);
    
    if (searchPath.length > 0) {
      const lastEmployee = searchPath[searchPath.length - 1];
      const node = nodes[0]?.find((n) => n.id === lastEmployee['Employee Id'].toString());

      if (node) {
        setCurrentSelectedNode(lastEmployee);
        return;
      }
      
      // Collapse the first employee in the searchPath if the last one is already found
      collapseNode(searchPath[0], 0);
      const newExpandedNodes = { ...expandedNodes[0] };
      searchPath.forEach((employee) => {
        const value = {
          ...expandedNodes[0],
          [employee['level']]: employee,
        };

        newExpandedNodes[employee['level']] = employee;
        
        setNodes((currentNodes) => {
          const node = currentNodes[0]?.find((n) => n.id === employee['Employee Id'].toString());
          if (!node) {
            return currentNodes;
          }
          
          setCurrentSelectedNode(employee);
    

          const { nodes: newNodes, edges: newEdges } = createNodeArray(employee, node.position?.x, node.position?.y, 0);

          // Update edges state
          setEdges((currentEdges) => {
            const updatedEdges = [...(currentEdges[0] || []), ...newEdges];
            return { ...currentEdges, 0: updatedEdges };
          });

          // Update nodes state
          return {
            ...currentNodes,
            [0]: [...(currentNodes[0] || []), ...newNodes],
          };
        });
      });
      setExpandedNodes((currentExpandedNodes) => ({
        ...currentExpandedNodes,
        0: newExpandedNodes,
      }));
    }

  }, [searchPath]);

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
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
