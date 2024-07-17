import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context object
const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [currentSelectedNode, setCurrentSelectedNode] = useState(null);


  useEffect(()=>{
    console.log('nodes has been expanded');
  }, [expandedNodes])


  return (
    <GlobalStateContext.Provider
      value={{ nodes, setNodes, edges, setEdges, expandedNodes, setExpandedNodes, currentSelectedNode, setCurrentSelectedNode }}
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
