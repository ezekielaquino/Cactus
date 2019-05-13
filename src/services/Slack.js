import * as Http from "../providers/Http"
import QueryString from 'query-string';

export const sendMessage = (token, channel, text ) => {
  const body = {
    token, 
    channel, 
    text
  }
  return Http.slackPost(`https://slack.com/api/chat.postMessage`, QueryString.stringify(body))
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch((error)=> console.error(error));
}

export const getSlackChannels = (token) => {
  return Http.slackGet(`https://slack.com/api/conversations.list?token=${token}`, {})
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch((error)=> console.error(error));
}

// exchange temp code for access token
export const authSlack = () => {
  const { code } = QueryString.parse(window.location.search);
  if (!code) {
    return Promise.resolve();
  } 
  const client_id = process.env.GATSBY_CLIENT_ID; 
  const client_secret = process.env.GATSBY_CLIENT_SECRET; 
  const body = {
    client_id,
    client_secret, 
    code
  };
  
  return Http.slackPost(`https://slack.com/api/oauth.access`, QueryString.stringify(body))
  .then(response => response.json())
  .catch((error)=> console.error(error));
}


