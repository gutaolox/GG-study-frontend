import axios from 'axios';

export const customAxios = (authorization = true) => {
  const token = localStorage.getItem('token');
  const baseURL = `${process.env.REACT_APP_LINK}`;
  const timeout = 10000;
  const headers = { 'Access-Control-Allow-Headers': '*' };
  if (authorization) {
    headers.Authorization = `Bearer ${token}`;
  }
  return axios.create({
    baseURL,
    timeout,
    headers,
  });
};
