// this file contains validation helper functions
import { ERROR_MESSAGES } from '../constants';

export const validateEmail = (email: string): string => {
  if (!email) return ERROR_MESSAGES.REQUIRED;
  if (!email.includes('@')) return ERROR_MESSAGES.INVALID_EMAIL;
  return '';
};

export const validatePassword = (password: string, minLength = 6): string => {
  if (!password) return ERROR_MESSAGES.REQUIRED;
  if (password.length < minLength) return ERROR_MESSAGES.PASSWORD_TOO_SHORT(minLength);
  return '';
};