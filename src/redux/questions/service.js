import { DataService } from '../../config/dataService/dataService';

const addQuestions = async ({ body }) => {
  const response = await DataService.post(`/questions/`, body);
  return response;
};

const getQuestions = async ({ testId }) => {
  const response = await DataService.get(`/questions/${testId}`);
  return response;
};
const getAllQuestions = async ({ start, limit }) => {
  const response = await DataService.get(`/questions?start=${start}&&limit=${limit}`);
  return response;
};
const deleteQuestions = async (questionId) => {
  const response = await DataService.delete(`/questions/${questionId}`);
  return response;
};
const getSingleDetails = async (id) => {
  const response = await DataService.get(`/questions/single/${id}`);
  return response;
};
const updateQuestion = async ({ id, body }) => {
  const response = await DataService.put(`/questions/${id}`, body);
  return response;
};

const addTestDescription = async ({ id, body }) => {
  const response = await DataService.post(`/questions/testDescription/${id}`, body);
  return response;
};
export {
  addQuestions,
  getQuestions,
  deleteQuestions,
  getSingleDetails,
  updateQuestion,
  addTestDescription,
  getAllQuestions,
};
