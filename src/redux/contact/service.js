import { DataService } from '../../config/dataService/dataService';

const getContactUs = async ({ start, limit, keyword }) => {
  const response = await DataService.get(`/contactUs?start=${start}&limit=${limit}&keyword=${keyword}`);
  return response;
};

const updateContactStatus = async (complaintId) => {
  const response = await DataService.get(`/complaintConversation/${complaintId}`);
  return response;
};

const addComplaintConversation = async (complaintId, body) => {
  const response = await DataService.post(`/complaintConversation/${complaintId}`, body);
  return response;
};

export { getContactUs, updateContactStatus, addComplaintConversation };
