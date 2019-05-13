export const slackGet = (url) => {
  return fetch(url, {
    method: 'GET',
  });
}

export const slackPost = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body,
  });
}
