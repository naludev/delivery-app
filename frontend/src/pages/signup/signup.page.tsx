import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/session.hooks';
import { selectError } from '../../store/slices/session.slice';
import { createUser } from '../../store/actions/users.actions';
import { login } from '../../store/actions/session.actions'; 
import Footer from "../../components/footer.component";
import Button from "../../components/button.component";
import Input from "../../components/input.component";
import Text from "../../components/text.component";
import LinkButtonOutline from "../../components/outlinebutton.component";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createUser(formData)).unwrap();
      await dispatch(login({ email: formData.email, password: formData.password })).unwrap();
      
      navigate("/");
    } catch (err) {
      setError('Error al crear el usuario o al iniciar sesión.');
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
                <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} name="email" type="email" placeholder="Correo electrónico" />
              </div>
              <div className="relative flex items-start flex-col">
                <Text className="px-3 text-white text-center max-w-xs md:max-w-xl" type="description">Nombre de usuario</Text>
                <Input value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} name="username" placeholder="Nombre de usuario" />
              </div>
              <div className="relative flex items-start flex-col">
                <Text className="px-3 text-white text-center max-w-xs md:max-w-xl" type="description">Nombre</Text>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} name="name" placeholder="Nombre" />
              </div>
              <div className="relative flex items-start flex-col">
                <Text className="px-3 text-white text-center max-w-xs md:max-w-xl" type="description">Apellido</Text>
                <Input value={formData.lastname} onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} name="lastname" placeholder="Apellido" />
              </div>
              <div className="relative flex items-start flex-col">
                <Text className="px-3 text-white text-center max-w-xs md:max-w-xl" type="description">
                  Contraseña
                </Text>
                <Input value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} name="password" type="password" placeholder="Contraseña" />
              </div>
              <div className="px-3 relative flex flex-row items-center justify-between">
                <Text className="text-white text-left whitespace-nowrap font-semibold" type="description">Soy mayor de edad</Text>
                <Input type="checkbox" checked={formData.adult} onChange={(e) => setFormData({ ...formData, adult: e.target.checked })} name="adult" className="ml-2" />
              </div>
              {(error || reduxError) && <p className="text-red-500 mt-2">{error}</p>}
              <div className="!mt-8">
                <Button type="submit" className="w-full inline-flex h-12 items-center justify-center rounded bg-zinc-200 px-6 shadow-md outline-none transition duration-200 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:shadow-lg focus:ring">
                  Registrarse
                </Button>
              </div>
              <LinkButtonOutline className="text-white w-full justify-center pt-5" label="Ya tengo una cuenta" onClick={() => navigate('/iniciar-sesion')} />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
