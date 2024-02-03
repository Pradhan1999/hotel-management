// import Cookies from 'js-cookie';

// const getItem = (key) => {
//   const data = Cookies.get(key);

//   try {
//     return JSON.parse(data);
//   } catch (err) {
//     return data;
//   }
// };

// const setItem = (key, value) => {
//   const stringify = typeof value !== 'string' ? JSON.stringify(value) : value;
//   return Cookies.set(key, stringify);
// };

// const removeItem = (key) => {
//   Cookies.remove(key);
// };

// const clearAll = () => {
//   Cookies.remove('access_token');
//   Cookies.remove('refresh_token');
//   Cookies.remove('user');
// };

// export { getItem, setItem, removeItem, clearAll };

const getItem = (key) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
};

const setItem = (key, value) => {
  return localStorage.setItem(key, value);
};

const removeItem = (key) => {
  localStorage.removeItem(key);
};

const clearAll = () => {
  localStorage.clear();
};

export { getItem, setItem, removeItem, clearAll };
