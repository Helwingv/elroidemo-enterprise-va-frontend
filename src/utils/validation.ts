import { PasswordRequirements } from '../types/auth';

export const validatePassword = (password: string): PasswordRequirements => {
  return {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const sanitizeInput = (input: string): string => {
  return input.trim();
};

export const isStrongPassword = (requirements: PasswordRequirements): boolean => {
  return Object.values(requirements).every(Boolean);
};