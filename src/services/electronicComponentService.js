import axios from 'axios';

const API_URL = '/api/v1/electronic-components';

export const fetchAllElectronicComponents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchOneElectronicComponent = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createElectronicComponent = async (electronicComponent) => {
  const response = await axios.post(API_URL, electronicComponent);
  return response.data;
};

export const updateElectronicComponent = async (id, electronicComponent) => {
  const response = await axios.put(`${API_URL}/${id}`, electronicComponent);
  return response.data;
};

export const deleteElectronicComponent = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
