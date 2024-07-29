// GlobalStateProvider.js
import React from 'react';
import { NodesProvider } from './NodeContext';
import { FlowsProvider } from './FlowsContext';
import { SearchProvider } from './SearchContext';

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
