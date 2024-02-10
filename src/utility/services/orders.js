import { callApi } from '../apiUtils';

const addOrder = async ({ body }) => {
  const response = await callApi.post(`/orders`, body);
  return response;
};

const getAllOrder = async ({ start, limit, search, status }) => {
  const response = await callApi.get(
    `/orders?start=${start}&limit=${limit}&status=${status ? status : ''}&search=${search ? search : ''}`,
  );
  return response;
};

const getSingleOrder = async ({ id }) => {
  const response = await callApi.get(`/orders/${id}`);
  return response;
};

const updateOrder = async ({ id, body }) => {
  const response = await callApi.put(`/orders/${id}`, body);
  return response;
};

const deleteOrder = async ({ id }) => {
  const response = await callApi.delete(`/orders/${id}`);
  return response;
};

export { addOrder, getAllOrder, getSingleOrder, updateOrder, deleteOrder };
