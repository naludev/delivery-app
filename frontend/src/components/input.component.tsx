import React from "react";

interface InputProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  type?: string;
  checked?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder, name, type, checked, className }) => {
  return (
    <div className="relative mb-4 w-full pt-2">
      <input
        type={type ? type : "text"}
        placeholder={placeholder || "Buscar..."}
        value={value}
        onChange={onChange}
        className={className ? className : "p-2 pl-4 pr-10 w-full rounded bg-zinc-200 text-slate-800"}
        name={name}
        checked={checked}
      />
    </div>
  );
};

export default Input;
