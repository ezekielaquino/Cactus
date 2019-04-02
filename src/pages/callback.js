import React, { useEffect, useContext } from 'react';
import { Context } from 'providers/Context';
import { init } from 'providers/Http';
import QueryString from 'query-string';
import initAccounts from '../providers/Accounts';


function Callback() {
  const context = useContext(Context);

  useEffect(() => {
    const { access_token: accessToken } = QueryString.parse(window.location.search);

    init(accessToken);
    localStorage.setItem('harvestToken', accessToken);
    context.setHarvestToken(accessToken);
  }, []);

  initAccounts({ redirect: true });

  return (
    <div>
      Initializing App!
    </div>
  )
}


export default Callback;