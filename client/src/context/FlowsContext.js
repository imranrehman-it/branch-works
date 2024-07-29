import {React, createContext, useContext, useState} from 'react';

const FlowsContext = createContext();

export const FlowsProvider = ({children}) => {
    const [flows, setFlows] = useState([]);

    const createNewFlow = (employee) => {
        setFlows((currentFlows) => [...currentFlows, {
          id: employee['Employee Id'],
          head: employee,
        }]);
      };
    
      const removeFlow = (flowId) => {
        setFlows((currentFlows) => currentFlows.filter((flow) => flow.id !== flowId));
      };

    return (
        <FlowsContext.Provider value={{
            flows,
            setFlows,
            createNewFlow,
            removeFlow
        }}>
            {children}
        </FlowsContext.Provider>
    );
}

export const useFlows = () => useContext(FlowsContext);