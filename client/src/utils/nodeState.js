
export const updateNodesAndEdges = (setNodes, setEdges, nodes, edges) => {
    setNodes(currentNodes => nodes);
    setEdges(currentEdges => edges);
  };
  
  export const updateExpandedNodes = (setExpandedNodes, employee, level) => {
    setExpandedNodes((currentExpandedNodes) => ({
      ...currentExpandedNodes,
      [level]: employee,
    }));
  };
  
  export const appendNodesAndEdges = (setNodes, setEdges, nodes, edges) => {
    setNodes((currentNodes) => [...currentNodes, ...nodes]);
    setEdges((currentEdges) => [...currentEdges, ...edges]);
  };