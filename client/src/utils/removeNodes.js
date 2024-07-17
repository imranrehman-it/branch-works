const removeNodes = (treeHead, nodes, edges) => {
    if (treeHead && edges && Array.isArray(edges)) {
      if(Array.isArray(treeHead['children']) && treeHead['children'].length > 0){
        treeHead['children'].forEach((child) => {
           ({ nodes, edges } = removeNodes(child, nodes, edges));
      
          nodes = nodes?.filter((node) => node.id !== child['Employee Id'].toString());
          edges = edges.filter((edge) => !edge.id.startsWith(`${treeHead['Employee Id']}-`));
      })
    }
    else
      {
        nodes = nodes?.filter((node) => node.id !== treeHead['Employee Id'].toString());
        edges = edges.filter((edge) => !edge.id.startsWith(`${treeHead['Employee Id']}-`));
      }
    return { nodes, edges };
  };
}

export default removeNodes;
  