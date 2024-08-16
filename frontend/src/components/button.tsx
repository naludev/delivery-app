import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', type = 'button', disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm font-medium rounded ${className}${disabled ? 'text-white font-bold rounded opacity-50 cursor-not-allowed' : ''}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
