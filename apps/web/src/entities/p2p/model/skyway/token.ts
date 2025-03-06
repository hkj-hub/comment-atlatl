import { authToken } from './constants';

export const getToken = () => {
  if (authToken) return authToken;
  if (!window) return '';
  return '';
};
