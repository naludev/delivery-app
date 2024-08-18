import React from 'react';
import Button from '@components/button';
import Text from '@components/text';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-zinc-200 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <Text className="text-center w-full" type="subtitle" variant="primary">{title}</Text>
        <Text className="text-center w-full mt-2" type="description" variant="primary">{message}</Text>
        <div className="flex justify-end gap-4 mt-4">
          <Button onClick={onConfirm} className="w-full inline-flex h-12 items-center justify-center rounded bg-red-600 px-6 shadow-md outline-none transition duration-200 text-xs font-semibold uppercase tracking-wider text-white hover:shadow-lg focus:ring">
            Confirmar
          </Button>
          <Button onClick={onClose} className="w-full inline-flex h-12 items-center justify-center rounded bg-zinc-200 px-6 shadow-md outline-none transition duration-200 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:shadow-lg focus:ring">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
