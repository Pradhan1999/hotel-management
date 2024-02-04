import Axios from 'axios';
import { Cookies } from 'react-cookie';
import queryString from 'querystring';

export const hostname = () => {
  let hostUrl = '';

  // hostUrl = 'https://hotel-backend-ahus.onrender.com/public';
  hostUrl = 'http://localhost:4000/api';

  return hostUrl;
};

export const cookies = new Cookies();

const hostUrl = hostname();

export const makeUrl = ({ uri, pathParams, query, version }, host) => {
  return `${host || hostUrl}${version}${uri
    .split('/')
    .map((param) => (param.charAt(0) === ':' ? encodeURI(pathParams?.[param.slice(1)] || '') : param))
    .join('/')}${query ? `?${queryString.stringify(query)}` : ''}`;
};

export const getDefaultHeaders = () => ({
  authorization: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
  'Content-Type': 'application/json',
});

const callAxios = ({ uriEndPoint, pathParams, query, body, apiHostUrl }) =>
  Axios({
    method: uriEndPoint.method,
    url: makeUrl({ ...uriEndPoint, pathParams, query }, apiHostUrl),
    withCredentials: true,
    headers: {
      ...getDefaultHeaders(),
      ...uriEndPoint.headerProps,
    },
    data: body || {},
  });

const callMockios = ({ uriEndPoint, pathParams, query, body }) =>
  Axios({
    method: uriEndPoint.method,
    url: makeUrl(
      { ...uriEndPoint, pathParams, query },
      `${window.location.protocol}//${window.location.hostname}:3030`,
    ),
    headers: {
      ...getDefaultHeaders(),
      ...uriEndPoint.headerProps,
    },
    data: body || {},
  });

// main function 👇
export function callApi({ uriEndPoint, pathParams, query, body, apiHostUrl, mock }) {
  return new Promise((resolve, reject) => {
    let callGenericApi = callAxios;
    if (mock) callGenericApi = callMockios;
    callGenericApi({
      uriEndPoint,
      pathParams,
      query,
      body,
      apiHostUrl,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        if (!err.response) {
          reject({ isServerUnreachable: true });

          return;
        }
        reject(err);
      });
  });
}
