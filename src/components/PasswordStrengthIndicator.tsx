import { PasswordRequirements } from '../types/auth';

interface PasswordStrengthIndicatorProps {
  requirements: PasswordRequirements;
}

export default function PasswordStrengthIndicator({ requirements }: PasswordStrengthIndicatorProps) {
  const getStrengthText = () => {
    const passedChecks = Object.values(requirements).filter(Boolean).length;
    if (passedChecks === 5) return 'Strong';
    if (passedChecks >= 3) return 'Moderate';
    return 'Weak';
  };

  const getStrengthColor = () => {
    const passedChecks = Object.values(requirements).filter(Boolean).length;
    if (passedChecks === 5) return 'bg-green-500';
    if (passedChecks >= 3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2">
        <div className={`h-2 flex-1 rounded-full bg-gray-200`}>
          <div
            className={`h-2 rounded-full transition-all ${getStrengthColor()}`}
            style={{ width: `${(Object.values(requirements).filter(Boolean).length / 5) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-600">{getStrengthText()}</span>
      </div>
      <ul className="mt-2 space-y-1 text-sm">
        <li className={`flex items-center gap-2 ${requirements.minLength ? 'text-green-600' : 'text-gray-500'}`}>
          <span className={`w-2 h-2 rounded-full ${requirements.minLength ? 'bg-green-500' : 'bg-gray-300'}`} />
          At least 8 characters
        </li>
        <li className={`flex items-center gap-2 ${requirements.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
          <span className={`w-2 h-2 rounded-full ${requirements.hasUpperCase ? 'bg-green-500' : 'bg-gray-300'}`} />
          One uppercase letter
        </li>
        <li className={`flex items-center gap-2 ${requirements.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
          <span className={`w-2 h-2 rounded-full ${requirements.hasLowerCase ? 'bg-green-500' : 'bg-gray-300'}`} />
          One lowercase letter
        </li>
        <li className={`flex items-center gap-2 ${requirements.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
          <span className={`w-2 h-2 rounded-full ${requirements.hasNumber ? 'bg-green-500' : 'bg-gray-300'}`} />
          One number
        </li>
        <li className={`flex items-center gap-2 ${requirements.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
          <span className={`w-2 h-2 rounded-full ${requirements.hasSpecialChar ? 'bg-green-500' : 'bg-gray-300'}`} />
          One special character
        </li>
      </ul>
    </div>
  );
}