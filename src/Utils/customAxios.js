import axios from 'axios';
import { BACK_END_API_LINK } from '../Configs/backend';

export const customAxios = (authorization = true) => {
  const token = localStorage.getItem('token');
  const baseURL = `${BACK_END_API_LINK.LINK}:${BACK_END_API_LINK.PORT}`;
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
