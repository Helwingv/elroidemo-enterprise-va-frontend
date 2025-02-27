import { useState, useCallback, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Shield, Mail, Eye, EyeOff } from 'lucide-react';
import { validatePassword, validateEmail, sanitizeInput, isStrongPassword } from '../utils/validation';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';
import type { FormSubmitEvent, PasswordRequirements } from '../types/auth';

export default function Login() {
  const { login, register, resendVerification, user, loading: authLoading, error: authError } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [lastRegisteredEmail, setLastRegisteredEmail] = useState('');
  const [showResendButton, setShowResendButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirements>({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  useEffect(() => {
    if (user && !authLoading) {
      navigate('/', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const validateForm = useCallback(() => {
    if (!email || !password) {
      setError('All fields are required');
      return false;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (mode === 'register' && !isStrongPassword(passwordRequirements)) {
      setError('Please meet all password requirements');
      return false;
    }
    
    if (mode === 'register') {
      if (!name) {
        setError('Name is required');
        return false;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    
    return true;
  }, [email, password, name, confirmPassword, mode]);

  const handlePasswordChange = (value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setPassword(sanitizedValue);
    setPasswordRequirements(validatePassword(sanitizedValue));
  };

  const handleSubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();
    setError('');
    setShowResendButton(false);

    if (!validateForm()) {
      return;
    }

    try {
      if (mode === 'register') {
        await register({
          email,
          password,
          name,
          redirectTo: `${window.location.origin}/login`
        });
        setLastRegisteredEmail(email);
        setShowResendButton(true);
        setEmail('');
        setPassword('');
        setName('');
        setConfirmPassword('');
        setError('Registration successful! Please check your email to verify your account.');
      } else {
        await login({ 
          email, 
          password,
          redirectTo: `${window.location.origin}/`
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(mode === 'register' ? 'Registration failed' : 'Invalid credentials');
      }
    }
  };

  const handleResendVerification = async () => {
    if (!lastRegisteredEmail) return;
    try {
      await resendVerification(lastRegisteredEmail);
      setError('Verification email has been resent. Please check your inbox.');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to resend verification email. Please try again.');
      }
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setShowResendButton(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img src="/elroi-logo.svg" alt="Elroi" className="mx-auto h-12 w-auto" loading="eager" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {mode === 'register' ? 'Create your account' : 'Sign in to your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {mode === 'register' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={toggleMode}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {mode === 'register' ? 'Sign in' : 'Register now'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {(error || authError) && (
              <div className={`px-4 py-3 rounded-md text-sm ${
                (error || '').includes('successful') 
                  ? 'bg-green-50 border border-green-200 text-green-600'
                  : 'bg-red-50 border border-red-200 text-red-600'
              }`}>
                {error || authError}
                {showResendButton && (
                  <button
                    onClick={handleResendVerification}
                    className={`mt-2 flex items-center text-blue-600 hover:text-blue-700 ${
                      authLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={authLoading}
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    {authLoading ? 'Sending...' : 'Resend verification email'}
                  </button>
                )}
              </div>
            )}
            
            {mode === 'register' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                </button>
              </div>
              {mode === 'register' && <PasswordStrengthIndicator requirements={passwordRequirements} />}
            </div>

            {mode === 'register' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    aria-label="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                  </button>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  authLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {authLoading ? (mode === 'register' ? 'Creating Account...' : 'Signing in...') : mode === 'register' ? 'Create Account' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}