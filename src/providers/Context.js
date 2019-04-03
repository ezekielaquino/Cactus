import React, { createContext, useState } from 'react';


export const Context = createContext({
  initialized: false,
  user: {},
  harvestAccounts: [],
  harvestToken: '',
  activeProjects: [],
  initState: {
    accounts: false,
    projects: false,
  },
  setInitialized: () => {},
  setUser: () => {},
  setHarvestAccounts: () => {},
  setHarvestToken: () => {},
  setActiveProjects: () => {},
  setInitState: () => {},
});

export function ContextProvider(props) {
  const { children } = props;
  const [ initialized, setInitialized ] = useState(false);
  const [ user, setUser ] = useState(null);
  const [ activeProjects, setActiveProjects ] = useState([]);
  const [ harvestAccounts, setHarvestAccounts ] = useState(null);
  const [ harvestToken, setHarvestToken ] = useState(localStorage.getItem('harvestToken'));
  const [ initState, setInitState ] = useState({ accounts: false, projects: false });
  const contextProps = {
    initialized,
    setInitialized,
    user,
    activeProjects,
    setUser,
    initState,
    harvestAccounts,
    setHarvestAccounts,
    harvestToken,
    setHarvestToken,
    setActiveProjects,
    setInitState,
  };
  
  return (
    <Context.Provider value={contextProps}>
      { children }
    </Context.Provider>
  )
}