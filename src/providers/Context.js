import React, { createContext, useState } from 'react';

export const Context = createContext({
  initialized: false,
  user: {},
  slackAccessToken: '',
  slackUserId: '',
  slackChannel: '',
  channels: [],
  initState: {
    slackAccount: null,
    channels: null,
  },
  setInitialized: () => {},
  setUser: () => {},
  setSlackAccessToken: () => {},
  setSlackUserId: () => {},
  setSlackChannel: ()=> {},
  setChannels: () => {},
  setInitState: () => {},
});

export function ContextProvider(props) {
  const { children } = props;
  const [ initialized, setInitialized ] = useState(false);
  const [ user, setUser ] = useState(null);

  const [ slackAccessToken, setSlackAccessToken ] = useState(localStorage.getItem('slackAccessToken'));
  const [ slackUserId, setSlackUserId   ] = useState(localStorage.getItem('slackUserId'))
  const [ channels, setChannels ] = useState([]);
  const [ slackChannel, setSlackChannel ] = useState('');

  const [ initState, setInitState ] = useState({ slackAccount:null, channels:null });
  const contextProps = {
    initialized,
    user,
    slackAccessToken, 
    slackUserId,
    channels, 
    slackChannel,
    initState,
    setInitialized,
    setUser,
    setSlackAccessToken, 
    setSlackUserId,
    setChannels,
    setSlackChannel,
    setInitState,
  };
  
  return (
    <Context.Provider value={contextProps}>
      { children }
    </Context.Provider>
  )
}