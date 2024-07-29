const removeNodes = (treeHead, nodes, edges, flowId) => {
  let flowNodes = nodes[flowId] || [];
  let flowEdges = edges[flowId] || [];
  console.log('node to remove', treeHead);

  const removeChildNodesAndEdges = (node) => {
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        removeChildNodesAndEdges(child);
        flowNodes = flowNodes.filter((n) => n.id !== child['Employee Id'].toString() && n.id !== 'line');
        flowEdges = flowEdges.filter((e) => !e.id.startsWith(`${node['Employee Id']}-`));
      });
    } else {

      // flowNodes = flowNodes.filter((n) => n.id !== node['Employee Id'].toString() && n.id !== 'line');
      // flowEdges = flowEdges.filter((e) => !e.id.startsWith(`${node['Employee Id']}-`));

    }
  };

  if (treeHead) {
    removeChildNodesAndEdges(treeHead);
  }

  return {
    nodes: { ...nodes, [flowId]: flowNodes },
    edges: { ...edges, [flowId]: flowEdges }
  };
};

export default removeNodes;
