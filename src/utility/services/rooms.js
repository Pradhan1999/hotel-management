import { callApi } from '../apiUtils';

const addRooms = async ({ body }) => {
  const response = await callApi.post(`/rooms`, body);
  return response;
};

const getAllRooms = async ({ start, limit, roomNumber, status }) => {
  const response = await callApi.get(
    `/rooms?start=${start}&limit=${limit}&roomNumber=${roomNumber ? roomNumber : ''}&status=${status ? status : ''}`,
  );
  return response;
};

const getSingleRoom = async ({ id }) => {
  const response = await callApi.get(`/rooms/${id}`);
  return response;
};

const updateRoom = async ({ id, body }) => {
  const response = await callApi.put(`/rooms/${id}`, body);
  return response;
};

const deleteRoom = async ({ id }) => {
  const response = await callApi.delete(`/rooms/${id}`);
  return response;
};

export { addRooms, getAllRooms, getSingleRoom, updateRoom, deleteRoom };
