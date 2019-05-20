import React, { useEffect, useContext } from 'react';
import { navigate } from 'gatsby';
import { Context } from '../providers/Context';
import { authSlack, getSlackChannels, sendMessage } from '../services/Slack';

function initSlack() {
  const context = useContext(Context);

  const getChannels = (token)=> {
    getSlackChannels(token)
      .then(data => {
        if(!data || !data.ok){
          return;
        }
        context.setChannels(data.channels);
        context.setInitialized(true);
        setTimeout(() => {
          context.setInitState({ slackAccount: 'success', channels: 'loading' });
        }, 500);
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('slackAccessToken');
    if (token) {
      context.setInitState({
        ...context.initState,
        slackAccount: 'loading',
      });
    };

   authSlack()
    .then(data => {
      if(data && data.access_token) {
        localStorage.setItem('slackAccessToken', data.access_token);       
        localStorage.setItem('slackUserId', data.user_id);
        context.setSlackUserId(data.user_id);
        context.setSlackAccessToken(data.access_token);
        navigate('/');
      }   

      const token = localStorage.getItem('slackAccessToken');
      if(token){
        context.setInitState({ slackAccount: 'success', channels: 'loading' });
        getChannels(token);
      }

    })
    .catch((error) => {
      console.error(error);
    });

  }, []);
}


export default initSlack;
