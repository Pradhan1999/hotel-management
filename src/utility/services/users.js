import { callApi } from '../apiUtils';

const addUser = async ({ body }) => {
  const response = await callApi.post(`/users`, body);
  return response;
};

const getAllUser = async ({ start, limit }) => {
  const response = await callApi.get(`/users?start=${start}&limit=${limit}`);
  return response;
};

const getSingleUser = async ({ id }) => {
  const response = await callApi.get(`/users/${id}`);
  return response;
};

const updateUser = async ({ id, body }) => {
  const response = await callApi.put(`/users/${id}`, body);
  return response;
};

const deleteUser = async (questionId) => {
  const response = await callApi.delete(`/users/${questionId}`);
  return response;
};

export { addUser, getAllUser, getSingleUser, updateUser, deleteUser };
