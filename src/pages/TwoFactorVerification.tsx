import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Shield } from 'lucide-react';

export default function TwoFactorVerification() {
  const { verifyTwoFactor, sendTwoFactorCode, user, error } = useAuth();
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    if (user?.email) {
      try {
        await sendTwoFactorCode(user.email);
        setCodeSent(true);
      } catch (err) {
        // Error is handled by useAuth
      }
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyTwoFactor({ verification_code: verificationCode });
      navigate('/');
    } catch (err) {
      // Error is handled by useAuth
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Shield className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Two-Factor Authentication
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please verify your identity to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleVerify}>
            {!codeSent ? (
              <div>
                <p className="text-sm text-gray-500 mb-4">
                  Click the button below to receive a verification code via email
                </p>
                <button
                  type="button"
                  onClick={handleSendCode}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Verification Code
                </button>
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    Verification Code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter verification code"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Verify
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleSendCode}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Resend Code
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}