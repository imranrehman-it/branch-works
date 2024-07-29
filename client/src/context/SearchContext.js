import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNodes } from './NodeContext';
import { createNodeArray } from '../utils/createNodes';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchPath, setSearchPath] = useState([]);
  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    expandedNodes,
    setExpandedNodes,
    setCurrentSelectedNode,
    collapseNode,
  } = useNodes();

  useEffect(() => {
    if (searchPath.length > 0) {
      const lastEmployee = searchPath[searchPath.length - 1];
      const node = nodes[0]?.find((n) => n.id === lastEmployee['Employee Id'].toString());

      if (node) {
        setCurrentSelectedNode(lastEmployee);
        return;
      }

      collapseNode(searchPath[0], 0);
      const newExpandedNodes = { ...expandedNodes[0] };

      searchPath.forEach((employee) => {
        newExpandedNodes[employee['level']] = employee;

        setNodes((currentNodes) => {
          const node = currentNodes[0]?.find((n) => n.id === employee['Employee Id'].toString());
          if (!node) {
            return currentNodes;
          }
          setCurrentSelectedNode(employee);
          const { nodes: newNodes, edges: newEdges } = createNodeArray(employee, node.position?.x, node.position?.y, 0);

          setEdges((currentEdges) => {
            const updatedEdges = [...(currentEdges[0] || []), ...newEdges];
            return { ...currentEdges, 0: updatedEdges };
          });
          
          return {
            ...currentNodes,
            0: [...(currentNodes[0] || []), ...newNodes],
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
    <SearchContext.Provider value={{
      searchPath,
      setSearchPath
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
