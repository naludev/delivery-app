// src/components/QuantityInput.tsx
import { FC } from 'react';

interface QuantityInputProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: number) => void;
}

const QuantityInput: FC<QuantityInputProps> = ({ value, onIncrement, onDecrement, onChange }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <button onClick={onDecrement} className="bg-gray-600 text-white p-2 rounded">
        -
      </button>
      <input type="number" value={value} min="1" readOnly className="p-1 rounded border border-gray-300 w-12 text-center" />
      <button onClick={onIncrement} className="bg-gray-600 text-white p-2 rounded">
        +
      </button>
    </div>
  );
};

export default QuantityInput;