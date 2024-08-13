import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative mb-4 w-full pt-5">
      <input
        type="text"
        placeholder={placeholder || "Buscar..."}
        value={value}
        onChange={onChange}
        className="p-2 pl-4 pr-10 w-full rounded bg-white text-slate-800"
      />
    </div>
  );
};

export default Input;
