import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '@hooks/session.hooks';
import { selectError } from '@store/slices/session.slice';
import { createUser } from '@store/actions/users.actions';
import { login } from '@store/actions/session.actions';
import Button from "@components/button.component";
import Input from "@components/input.component";
import Text from "@components/text.component";
import LinkButtonOutline from "@components/outlinebutton.component";
import { validateForm, handleInputChange, isFormValid, FormData } from "./utils";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    name: '',
    lastname: '',
    password: '',
    adult: false,
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const reduxError = useAppSelector(selectError);

  const { errors, validate } = validateForm(formData, {
    email: { required: true, email: true },
    username: { required: true, minLength: 3 },
    name: { required: true, minLength: 2 },
    lastname: { required: true, minLength: 2 },
    password: { required: true, minLength: 6 },
    adult: { required: true, isAdult: true }
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        await dispatch(createUser(formData)).unwrap();
        await dispatch(login({ email: formData.email, password: formData.password })).unwrap();
        navigate("/");
      } catch (err) {
        setError('Error al crear el usuario o al iniciar sesión.');
      }
    }
  };

  return (
    <div className="bg-gray-900 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded bg-slate-800 shadow">
            <Text className="text-center w-full max-w-full" type="subtitle" variant="secondary">Registrarse</Text>
            <form className="mt-8" onSubmit={onSubmit}>
              <div className="relative flex items-start flex-col">
                <Text className="px-3 text-white text-center max-w-xs md:max-w-xl" type="description">Correo electrónico</Text>
                <Input value={formData.email} onChange={(e) => handleInputChange(e, setFormData)} name="email" type="email" placeholder="Correo electrónico" />
                {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div className="relative flex items-start flex-col">
                <Text className="px-3 text-white text-center max-w-xs md:max-w-xl" type="description">Nombre de usuario</Text>
                <Input value={formData.username} onChange={(e) => handleInputChange(e, setFormData)} name="username" placeholder="Nombre de usuario" />
                {errors.username && <p className="text-red-500 mt-1">{errors.username}</p>}
              </div>
              <div className="relative flex items-start flex-col">
                <Text className="px-3 text-white text-center max-w-xs md:max-w-xl" type="description">Nombre</Text>
                <Input value={formData.name} onChange={(e) => handleInputChange(e, setFormData)} name="name" placeholder="Nombre" />
                {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div className="relative flex items-start flex-col">
                <Text className="px-3 text-white text-center max-w-xs md:max-w-xl" type="description">Apellido</Text>
                <Input value={formData.lastname} onChange={(e) => handleInputChange(e, setFormData)} name="lastname" placeholder="Apellido" />
                {errors.lastname && <p className="text-red-500 mt-1">{errors.lastname}</p>}
              </div>
              <div className="relative flex items-start flex-col">
                <Text className="px-3 text-white text-center max-w-xs md:max-w-xl" type="description">Contraseña</Text>
                <Input value={formData.password} onChange={(e) => handleInputChange(e, setFormData)} name="password" type="password" placeholder="Contraseña" />
                {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
              </div>
              <div className="px-3 relative flex flex-row items-center justify-between">
                <Text className="text-white text-left whitespace-nowrap font-semibold" type="description">Soy mayor de edad</Text>
                <Input type="checkbox" checked={formData.adult} onChange={(e) => handleInputChange(e, setFormData)} name="adult" className="ml-2" />
                {errors.adult && <p className="text-red-500 mt-1">{errors.adult}</p>}
              </div>
              {(error || reduxError) && <p className="text-red-500 mt-2">{error}</p>}
              <div className="!mt-8">
                <Button
                  type="submit"
                  disabled={!isFormValid(formData)}
                  className="w-full inline-flex h-12 items-center justify-center rounded bg-zinc-200 px-6 shadow-md outline-none transition duration-200 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:shadow-lg focus:ring"
                >
                  Registrarse
                </Button>
              </div>
              <LinkButtonOutline className="text-white w-full justify-center pt-5" label="Ya tengo una cuenta" onClick={() => navigate('/iniciar-sesion')} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
