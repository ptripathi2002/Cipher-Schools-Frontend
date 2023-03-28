import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/interests/`;

const createInterest = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

const getInterests = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteInterest = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const getInterest = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

const editInterest = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const interestService = {
  createInterest,
  getInterests,
  deleteInterest,
  getInterest,
  editInterest,
};

export default interestService;
