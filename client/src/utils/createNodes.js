import calculateNewPosition from "./newPositionCalculation";


const createNodesAndEdges = (parent, posX, posY, nodes, edges, flowId) => {
      createNodes(parent, posX, posY, nodes, flowId);
      createEdges(parent, edges, flowId);
};

const createEdges = (parent, edges, flowId) => {
  if (parent && parent['children'] && Array.isArray(parent['children'])) {
    parent['children'].forEach((child) => {
      if (edges.find((edge) => edge.id === `${parent['Employee Id']}-${child['Employee Id']}`)) {
        return;
      }
      edges.push({
        id: `${parent['Employee Id']}-${child['Employee Id']}`,
        source: parent['Employee Id'].toString(),
        target: child['Employee Id'].toString(),
        data: { flowId: flowId },
        animated: true,
        style : { strokeWidth: 2 }
        
      });
    });
  }
};

const createNodes = (parent, posX, posY, nodes, flowId) => {
  if (parent && parent['children'] && Array.isArray(parent['children'])) {
    parent['children'].forEach((child, index) => {
      const { x, y } = calculateNewPosition(posX, posY, parent['children'].length, index);
      if (nodes.find((node) => node.id === child['Employee Id'].toString())) {
        return;
      }
      nodes.push({
        id: child['Employee Id'].toString(),
        data: { employee: child, flowId: flowId },
        position: { x, y },
        type: 'employeeCard',
        hidden: false
      });
    });
     
  }
}

const createNodeArray = (treeHead, posX, posY, flowId) => {
  if (!treeHead) {
    return { nodes: [], edges: [] };
  }
  let nodes = [];
  let edges = [];
  const { x, y } = { x: posX, y: posY };
  createNodesAndEdges(treeHead, x, y, nodes, edges, flowId);

  return { nodes, edges };
};

//export all functions
export { createNodes, createEdges, createNodesAndEdges, createNodeArray };
