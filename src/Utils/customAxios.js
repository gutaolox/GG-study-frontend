import axios from 'axios';

export const customAxios = (authorization = true) => {
  const token = localStorage.getItem('token');
  const baseURL = 'http://localhost:4000';
  const timeout = 10000;
  const headers = { 'Access-Control-Allow-Headers': '*' };
  if (authorization) {
    headers.Authorization = `Bearer ${token}`;
  }
  console.log(headers);
  return axios.create({
    baseURL,
    timeout,
    headers,
  });
};
