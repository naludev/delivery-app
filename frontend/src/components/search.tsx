import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}

const Search: React.FC<InputProps> = ({ value, onChange, onClear, placeholder }) => {
  return (
    <div className="relative mb-4 w-full pt-5">
      <input
        type="text"
        placeholder={placeholder || "Buscar..."}
        value={value}
        onChange={onChange}
        className="p-2 pl-4 pr-10 w-full rounded bg-zinc-200 text-slate-800"
      />
      {value.length > 0 && (
        <button
          onClick={onClear}
          className="absolute right-2 top-10 transform -translate-y-1/2 text-white rounded-full bg-slate-700 w-7 h-7 flex items-center justify-center"
        >
          &#x2715;
        </button>
      )}
    </div>
  );
};

export default Search;
