import { DataService } from '../../config/dataService/dataService';

const addTestPaper = async ({ body }) => {
  const response = await DataService.post('/testPaper', body);
  return response;
};
const getSingleTestDetails = async (id) => {
  const response = await DataService.get(`/testPaper/${id}/`);
  return response;
};

const getTestPaper = async ({ start, limit }) => {
  const response = await DataService.get(`/testPaper?start=${start}&&limit=${limit}`);
  return response;
};

const updateTestPaper = async ({ id, body }) => {
  const response = await DataService.put(`/testPaper/${id}`, body);
  return response;
};

const deleteTestPaper = async (id) => {
  const response = await DataService.delete(`/testPaper/${id}`);
  return response;
};

export { addTestPaper, getTestPaper, updateTestPaper, deleteTestPaper, getSingleTestDetails };
