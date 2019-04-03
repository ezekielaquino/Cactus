let HEADERS = {};

export const init = token => {
  HEADERS = {
    "User-Agent": "Cactus (http://localhost:8000)",
    "Authorization": `Bearer ${token || localStorage.getItem('harvestToken')}`,
    "Content-Type": "application/json",
  };

  console.log('initialized')
};

export const get = (url, args = {}) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      ...HEADERS,
      ...args.appendHeaders,
    },
  });
};

export const post = (url, body, args = {}) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      ...HEADERS,
      ...args.appendHeaders,
    },
    body,
  });
}