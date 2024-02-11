import { callApi } from '../apiUtils';

const addCms = async ({ body }) => {
  const response = await callApi.post(`/cms`, body);
  return response;
};

const getAllCms = async ({ start, limit }) => {
  const response = await callApi.get(`/cms?start=${start}&limit=${limit}`);
  return response;
};

const getSingleCms = async ({ id }) => {
  const response = await callApi.get(`/cms/${id}`);
  return response;
};

const updateCms = async ({ id, body }) => {
  const response = await callApi.put(`/cms/${id}`, body);
  return response;
};

const deleteCms = async ({ id }) => {
  const response = await callApi.delete(`/cms/${id}`);
  return response;
};

export { addCms, getAllCms, getSingleCms, updateCms, deleteCms };
