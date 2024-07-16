
const removeNodes = (treeHead, nodes) => {
    if (treeHead && treeHead['children'] && Array.isArray(treeHead['children'])) {
        treeHead['children'].forEach((child) => {
        nodes = nodes.filter((node) => node.id !== child['Employee Id'].toString());
        nodes = removeNodes(child, nodes);
        });
    }
    
    return nodes;
}

export default removeNodes;
