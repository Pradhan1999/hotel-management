import { callApi } from '../apiUtils';

const loginUser = async (body) => {
  const response = await callApi.post('/auth/login', body);
  return response;
};

export { loginUser };
