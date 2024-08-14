import { login } from '../../store/actions/session.actions'; 
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store/config';

export const handleLogin = async (
  dispatch: AppDispatch,
  formData: { email: string; password: string },
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  try {
    const actionResult = await dispatch(login(formData));
    const result = unwrapResult(actionResult);

    localStorage.setItem('token', result);
    onSuccess();
  } catch (err) {
    onError("Error al iniciar sesión. Por favor, verifica tus credenciales.");
  }
};

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>
) => {
  const { name, value } = e.target;
  setFormData(prevData => ({
    ...prevData,
    [name]: value
  }));
};
