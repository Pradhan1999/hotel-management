import { callApi } from '../apiUtils';

const currentUser = async () => {
  const response = await callApi.get('/auth/me');
  return response;
};

const loginUser = async (body) => {
  const response = await callApi.post('/auth/login', body);
  return response;
};

export { currentUser, loginUser };
