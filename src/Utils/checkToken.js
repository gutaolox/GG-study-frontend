import jwtDecode from 'jwt-decode';

export const CheckToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const { exp } = jwtDecode(token);
    const expirationTime = exp * 1000 - 60000;

    return Date.now() <= expirationTime;
  }
  return false;
};
