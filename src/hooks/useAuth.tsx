import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authService } from '../services/auth';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  UpdateProfileCredentials,
  UpdatePasswordCredentials,
  NotificationSettings
} from '../types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setError: (error: string | null) => void;
  register: (credentials: RegisterCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (credentials: ResetPasswordCredentials) => Promise<void>;
  verifyForgotPassword: (credentials: EmailVerificationCredentials) => Promise<void>;
  verifyTwoFactor: (credentials: TwoFactorVerifyCredentials) => Promise<void>;
  sendTwoFactorCode: (email: string) => Promise<void>;
  logout: () => void;
  updateProfile: (credentials: UpdateProfileCredentials) => Promise<void>;
  updatePassword: (credentials: UpdatePasswordCredentials) => Promise<void>;
  getNotificationSettings: () => Promise<NotificationSettings>;
  updateNotificationSettings: (settings: NotificationSettings) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  setError: () => {},
  register: async () => {},
  login: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  verifyForgotPassword: async () => {},
  verifyTwoFactor: async () => {},
  resendVerification: async () => {},
  sendTwoFactorCode: async () => {},
  logout: () => {},
  updateProfile: async () => {},
  updatePassword: async () => {},
  getNotificationSettings: async () => ({ email: false, sms: false, push: false }),
  updateNotificationSettings: async () => {},
  error: null
});

const TIMEOUT_DURATION = 15000; // 15 seconds

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Provide a mock user
  const [user] = useState<User>({
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    tenant: 'NBA',
    isEmailVerified: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const register = useCallback(async (credentials: RegisterCredentials) => {
    let timeoutId: NodeJS.Timeout;
    setLoading(true);
    setError(null);
    
    // Input validation
    if (!credentials.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    if (credentials.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }
    
    if (!credentials.name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Registration request timed out. Please try again.');
    }, TIMEOUT_DURATION);

    try {
      await authService.register(credentials);
      clearTimeout(timeoutId);
      setLoading(false);
      setError('Registration successful! Please check your email to verify your account.');
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed. Please try again.');
      }
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    setError('');

    if (!credentials.email.trim() || !credentials.password.trim()) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    let timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Login request timed out. Please try again.');
    }, TIMEOUT_DURATION);

    try {
      const response = await authService.login(credentials);
      clearTimeout(timeoutId);
      setUser(response.user);
      setError('');
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const resendVerification = useCallback(async (email: string) => {
    let timeoutId: NodeJS.Timeout;
    setLoading(true);
    setError(null);

    timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Request timed out. Please try again.');
    }, TIMEOUT_DURATION);

    try {
      await authService.resendVerificationEmail(email);
      clearTimeout(timeoutId);
      setLoading(false);
      setError('Verification email has been resent. Please check your inbox.');
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to resend verification email. Please try again.');
      }
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setLoading(true);
    setError(null);
    try {
      authService.logout();
      setUser(null);
      setLoading(false);
      navigate('/login', { replace: true });
    } catch (err) {
      setError('Failed to logout');
      setLoading(false);
      throw err;
    }
  }, [navigate]);

  // Apply the same pattern to other auth functions
  const forgotPassword = useCallback(async (email: string) => {
    let timeoutId: NodeJS.Timeout;
    setLoading(true);
    setError(null);

    timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Request timed out. Please try again.');
    }, TIMEOUT_DURATION);

    try {
      await authService.forgotPassword(email);
      clearTimeout(timeoutId);
      setLoading(false);
    } catch (err) {
      clearTimeout(timeoutId);
      setError('Failed to send password reset email. Please try again.');
      setLoading(false);
    }
  }, []);

  // Add similar timeout and loading state handling for all other functions...
  const verifyForgotPassword = useCallback(async (credentials: EmailVerificationCredentials) => {
    let timeoutId: NodeJS.Timeout;
    setLoading(true);
    setError(null);

    timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Request timed out. Please try again.');
    }, TIMEOUT_DURATION);

    try {
      await authService.verifyForgotPassword(credentials);
      clearTimeout(timeoutId);
      setLoading(false);
    } catch (err) {
      clearTimeout(timeoutId);
      setError('Password reset verification failed. Please try again.');
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (credentials: ResetPasswordCredentials) => {
    let timeoutId: NodeJS.Timeout;
    setLoading(true);
    setError(null);

    timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Request timed out. Please try again.');
    }, TIMEOUT_DURATION);

    try {
      await authService.resetPassword(credentials);
      clearTimeout(timeoutId);
      setLoading(false);
    } catch (err) {
      clearTimeout(timeoutId);
      setError('Password reset failed. Please try again.');
      setLoading(false);
    }
  }, []);

  const verifyTwoFactor = useCallback(async (credentials: TwoFactorVerifyCredentials) => {
    let timeoutId: NodeJS.Timeout;
    setLoading(true);
    setError(null);

    timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Request timed out. Please try again.');
    }, TIMEOUT_DURATION);

    try {
      await authService.verifyTwoFactor(credentials);
      clearTimeout(timeoutId);
      setLoading(false);
    } catch (err) {
      clearTimeout(timeoutId);
      setError('Two-factor verification failed. Please try again.');
      setLoading(false);
    }
  }, []);

  const sendTwoFactorCode = useCallback(async (email: string) => {
    let timeoutId: NodeJS.Timeout;
    setLoading(true);
    setError(null);

    timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Request timed out. Please try again.');
    }, TIMEOUT_DURATION);

    try {
      await authService.sendTwoFactorCode(email);
      clearTimeout(timeoutId);
      setLoading(false);
    } catch (err) {
      clearTimeout(timeoutId);
      setError('Failed to send verification code. Please try again.');
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (credentials: UpdateProfileCredentials) => {
    let timeoutId: NodeJS.Timeout;
    setLoading(true);
    setError(null);

    timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Request timed out. Please try again.');
    }, TIMEOUT_DURATION);

    try {
      const updatedUser = await authService.updateProfile(credentials);
      clearTimeout(timeoutId);
      setUser(updatedUser);
      setLoading(false);
    } catch (err) {
      clearTimeout(timeoutId);
      setError('Failed to update profile. Please try again.');
      setLoading(false);
    }
  }, []);

  const updatePassword = useCallback(async (credentials: UpdatePasswordCredentials) => {
    let timeoutId: NodeJS.Timeout;
    setLoading(true);
    setError(null);

    timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Request timed out. Please try again.');
    }, TIMEOUT_DURATION);

    try {
      await authService.updatePassword(credentials);
      clearTimeout(timeoutId);
      setLoading(false);
    } catch (err) {
      clearTimeout(timeoutId);
      setError('Failed to update password. Please try again.');
      setLoading(false);
    }
  }, []);

  const getNotificationSettings = useCallback(async () => {
    let timeoutId: NodeJS.Timeout;
    setLoading(true);
    setError(null);

    timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Request timed out. Please try again.');
    }, TIMEOUT_DURATION);

    try {
      const settings = await authService.getNotificationSettings();
      clearTimeout(timeoutId);
      setLoading(false);
      return settings;
    } catch (err) {
      clearTimeout(timeoutId);
      setError('Failed to get notification settings. Please try again.');
      setLoading(false);
      throw err;
    }
  }, []);

  const updateNotificationSettings = useCallback(async (settings: NotificationSettings) => {
    let timeoutId: NodeJS.Timeout;
    setLoading(true);
    setError(null);

    timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Request timed out. Please try again.');
    }, TIMEOUT_DURATION);

    try {
      await authService.updateNotificationSettings(settings);
      clearTimeout(timeoutId);
      setLoading(false);
    } catch (err) {
      clearTimeout(timeoutId);
      setError('Failed to update notification settings. Please try again.');
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      setError,
      register,
      login,
      forgotPassword,
      resetPassword,
      verifyForgotPassword,
      resendVerification,
      verifyTwoFactor,
      sendTwoFactorCode,
      logout,
      updateProfile,
      updatePassword,
      getNotificationSettings,
      updateNotificationSettings,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}