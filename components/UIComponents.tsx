import React from 'react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-6 rounded-full font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:active:scale-100";
  
  const variants = {
    primary: "bg-brand-red text-white shadow-lg shadow-red-200 hover:bg-brand-darkRed",
    secondary: "bg-white text-brand-red border border-gray-200 shadow-sm hover:bg-gray-50",
    outline: "border-2 border-brand-red text-brand-red bg-transparent hover:bg-red-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Checkbox ---
interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, checked, onChange, label }) => {
  return (
    <div className="flex items-start space-x-3 py-2" onClick={() => onChange(!checked)}>
      <div className={`mt-1 w-6 h-6 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${checked ? 'bg-brand-red border-brand-red' : 'bg-white border-gray-300'}`}>
        {checked && (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <label htmlFor={id} className="text-sm text-gray-600 leading-snug select-none cursor-pointer">
        {label}
      </label>
    </div>
  );
};

// --- Toggle Switch ---
interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleProps> = ({ checked, onChange }) => {
    return (
        <div 
            onClick={() => onChange(!checked)}
            className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${checked ? 'bg-brand-red' : 'bg-gray-300'}`}
        >
            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </div>
    );
};

// --- Card ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 ${className} ${onClick ? 'cursor-pointer active:scale-98 transition-transform' : ''}`}
    >
      {children}
    </div>
  );
};

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-brand-red' }) => (
  <span className={`${color} text-white text-xs font-bold px-2 py-1 rounded-full`}>
    {children}
  </span>
);