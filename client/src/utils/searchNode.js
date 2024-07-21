const searchNodeByName = (treeHead, name) => {
    const path = [];

    const recursiveSearch = (node, name) => {
      path.push(node);

      if (node['Name'] === name) {
        return true;
      }

      if (Array.isArray(node['children']) && node['children'].length > 0) {
        for (const child of node['children']) {
          if (recursiveSearch(child, name)) {
            return true;
          }
        }
      }
      
      path.pop();
      return false;
    };
    recursiveSearch(treeHead, name);
    return path
  };
  
  export default searchNodeByName;
  