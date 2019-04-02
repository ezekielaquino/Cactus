import React, { useEffect, useContext } from 'react';
import { Context } from 'providers/Context';
import QueryString from 'query-string';


function Callback() {
  const context = useContext(Context);

  useEffect(() => {
    const { access_token: accessToken } = QueryString.parse(window.location.search);

    localStorage.setItem('harvestToken', accessToken);
    context.setHarvestToken(accessToken);
  }, []);

  return (
    <div>
      Initializing App!
    </div>
  )
}


export default Callback;