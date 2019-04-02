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
    mode: 'cors',
    headers: {
      ...HEADERS,
      ...args.appendHeaders,
    },
  });
};