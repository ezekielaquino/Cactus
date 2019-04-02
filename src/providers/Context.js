import React, { createContext, useState } from 'react';


export const Context = createContext({
  initialized: false,
  user: {},
  harvestAccounts: [],
  harvestToken: '',
  activeProjects: [],
  setInitialized: () => {},
  setUser: () => {},
  setHarvestAccounts: () => {},
  setHarvestToken: () => {},
  setActiveProjects: () => {},
});

export function ContextProvider(props) {
  const { children } = props;
  const [ initialized, setInitialized ] = useState(false);
  const [ user, setUser ] = useState(null);
  const [ activeProjects, setActiveProjects ] = useState([]);
  const [ harvestAccounts, setHarvestAccounts ] = useState(null);
  const [ harvestToken, setHarvestToken ] = useState(localStorage.getItem('harvestToken'));
  const contextProps = {
    initialized,
    setInitialized,
    user,
    activeProjects,
    setUser,
    harvestAccounts,
    setHarvestAccounts,
    harvestToken,
    setHarvestToken,
    setActiveProjects,
  };
  
  return (
    <Context.Provider value={contextProps}>
      { children }
    </Context.Provider>
  )
}