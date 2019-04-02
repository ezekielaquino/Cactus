let HEADERS = {};

export const init = () => {
  HEADERS = {
    "User-Agent": "Cactus (http://localhost:8000)",
    "Authorization": `Bearer ${localStorage.getItem('harvestToken')}`,
    "Content-Type": "application/json",
  };
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