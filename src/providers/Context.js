import React, { createContext, useState } from 'react';


export const Context = createContext({
  initialized: false,
  user: {},
  harvestAccounts: [],
  harvestToken: '',
  setInitialized: () => {},
  setUser: () => {},
  setHarvestAccounts: () => {},
  setHarvestToken: () => {},
});

export function ContextProvider(props) {
  const { children } = props;
  const [ initialized, setInitialized ] = useState(false);
  const [ user, setUser ] = useState(null);
  const [ harvestAccounts, setHarvestAccounts ] = useState(null);
  const [ harvestToken, setHarvestToken ] = useState(localStorage.getItem('harvestToken'));
  const contextProps = {
    initialized,
    setInitialized,
    user,
    setUser,
    harvestAccounts,
    setHarvestAccounts,
    harvestToken,
    setHarvestToken,
  };
  
  return (
    <Context.Provider value={contextProps}>
      { children }
    </Context.Provider>
  )
}