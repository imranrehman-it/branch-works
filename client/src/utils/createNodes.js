import calculateNewPosition from "./newPositionCalculation";

const createNodes = (parent, posX, posY, nodes, edges) => {
  if (parent && parent['children'] && Array.isArray(parent['children'])) {
    parent['children'].forEach((child, index) => {
      const { x, y } = calculateNewPosition(posX, posY, parent['children'].length, index);
      
      
      nodes.push({ id: child['Employee Id'].toString(), data: { employee: child }, position: { x, y }, type: 'employeeCard', hidden: false });
  
 

      edges.push({ id: `${parent['Employee Id']}-${child['Employee Id']}`, source: parent['Employee Id'].toString(), target: child['Employee Id'].toString() , type: 'smoothstep' });

    });
  }
};

const createNodeArray = (treeHead, posX, posY) => {
  if (!treeHead) {
    return { nodes: [], edges: [] };
  }

  let nodes = [];
  let edges = [];
  const { x, y } = { x: posX, y: posY };

//   nodes.push({ id: treeHead['Employee Id'].toString(), data: { employee: treeHead }, position: { x, y }, type: 'employeeCard', hidden: false });

  createNodes(treeHead, x, y, nodes, edges);

  console.log('nodes', nodes);
  console.log('edges', edges);

  return { nodes, edges };
};

export default createNodeArray;
