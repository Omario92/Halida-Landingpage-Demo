import React from 'react';
import { Gender } from '../types';

interface GenderToggleProps {
  value: Gender;
  onChange: (g: Gender) => void;
  disabled?: boolean;
}

const GenderToggle: React.FC<GenderToggleProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={() => onChange('male')}
        disabled={disabled}
        className={`px-6 py-3 rounded-lg border-2 font-medium transition-all w-32 flex items-center justify-center gap-2
          ${value === 'male' 
            ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm ring-2 ring-brand-200' 
            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <span>♂</span> Nam
      </button>
      <button
        onClick={() => onChange('female')}
        disabled={disabled}
        className={`px-6 py-3 rounded-lg border-2 font-medium transition-all w-32 flex items-center justify-center gap-2
          ${value === 'female' 
            ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-sm ring-2 ring-pink-200' 
            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
          }
           ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <span>♀</span> Nữ
      </button>
    </div>
  );
};

export default GenderToggle;
