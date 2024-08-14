import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', type = 'button' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm font-medium rounded ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
