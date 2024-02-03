import { DataService } from '../../config/dataService/dataService';

const getCustomers = async ({ start, limit, keyword }) => {
  const response = await DataService.get(`/user?start=${start}&limit=${limit}&keyword=${keyword}`);
  return response;
};

export { getCustomers };
