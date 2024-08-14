import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/session.hooks';
import { selectError } from '../../store/slices/session.slice';
import { handleLogin, handleInputChange } from './utils';
import Footer from "../../components/footer.component";
import Button from "../../components/button.component";
import Input from "../../components/input.component";
import Text from "../../components/text.component";
import LinkButtonOutline from "../../components/outlinebutton.component";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const reduxError = useAppSelector(selectError);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(dispatch, formData, () => navigate("/"), setError);
  };

  return (
    <div className="bg-gray-900 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded bg-slate-800 shadow">
            <Text className="text-center w-full max-w-full" type="subtitle" variant="secondary">Iniciar sesión</Text>
            <form className="mt-8" onSubmit={onSubmit}>
              <div className="relative flex items-start flex-col">
                <Text className="px-3 text-white text-center max-w-xs md:max-w-xl" type="description">
                  Correo electrónico
                </Text>
                <Input value={formData.email} onChange={(e) => handleInputChange(e, setFormData)} name="email" type="email" placeholder="Correo electrónico" />
              </div>
              <div className="relative flex items-start flex-col">
                <Text className="px-3 text-white text-center max-w-xs md:max-w-xl" type="description">
                  Contraseña
                </Text>
                <Input value={formData.password} onChange={(e) => handleInputChange(e, setFormData)} name="password" type="password" placeholder="Contraseña" />
              </div>
              <LinkButtonOutline className="w-full justify-end text-[10px] underline text-blue-400" label="olvide mi contraseña" onClick={() => navigate('/resetear-contraseña')} />
              {(error || reduxError) && <p className="text-red-500 mt-2">{error}</p>}
              <div className="!mt-8">
                <Button type="submit" className="w-full inline-flex h-12 items-center justify-center rounded bg-zinc-200 px-6 shadow-md outline-none transition duration-200 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:shadow-lg focus:ring">
                  Iniciar sesión
                </Button>
              </div>
              <LinkButtonOutline className="text-white w-full justify-center pt-5" label="REGISTRARSE" onClick={() => navigate('/registrarse')} />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
