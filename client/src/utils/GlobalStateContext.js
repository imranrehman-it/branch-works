// GlobalStateProvider.js
import React from 'react';
import { NodesProvider } from '../context/NodeContext';
import { FlowsProvider } from '../context/FlowsContext';
import { SearchProvider } from '../context/SearchContext';

const GlobalStateProvider = ({ children }) => {
  return (
    <NodesProvider>
      <FlowsProvider>
        <SearchProvider>
          {children}
        </SearchProvider>
      </FlowsProvider>
    </NodesProvider>
  );
};

export default GlobalStateProvider;
