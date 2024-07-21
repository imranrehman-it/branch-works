const searchNodeByName = (treeHead, name) => {
    const path = [];

    console.log('treeHead search', treeHead);
    console.log('name search', name);
  
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
    
    //return all but the last index
    return path
  };
  
  export default searchNodeByName;
  