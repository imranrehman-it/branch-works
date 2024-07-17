const removeNodes = (treeHead, nodes, edges) => {
    if (treeHead && treeHead['children'] && Array.isArray(treeHead['children']) && edges && Array.isArray(edges)) {
      treeHead['children'].forEach((child) => {
        nodes = nodes.filter((node) => node.id !== child['Employee Id'].toString());
        edges = edges.filter((edge) => !edge.id.startsWith(`${treeHead['Employee Id']}-`));
        removeNodes(child, nodes, edges);
      });
    }
    return { nodes, edges };
  };
  
  export default removeNodes;
  