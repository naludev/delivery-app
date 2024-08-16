import React from 'react';
import { useAppSelector, useAppDispatch } from '@hooks/session.hooks';
import { hideToast, selectToast } from '@store/slices/toast.slice';

const Toast: React.FC = () => {
  const dispatch = useAppDispatch();
  const { message, visible } = useAppSelector(selectToast);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 rounded">
      <p>{message}</p>
      <button
        onClick={() => dispatch(hideToast())}
        className="ml-4 font-bold"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
