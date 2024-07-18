const searchNodeByName = (treeHead, name) => {
    const path = [];
  
    const recursiveSearch = (node, name) => {
      // Add the current node to the path
      path.push(node);
  
      // Check if the current node is the target node
      if (node['Name'] === name) {
        return true;
      }
  
      // If the node has children, search them recursively
      if (Array.isArray(node['children']) && node['children'].length > 0) {
        for (const child of node['children']) {
          if (recursiveSearch(child, name)) {
            return true;
          }
        }
      }
  
      // If the node is not found in the current path, remove the current node from the path
      path.pop();
      return false;
    };
  
    // Start the recursive search
    recursiveSearch(treeHead, name);
  
    return path;
  };
  
  export default searchNodeByName;
  