import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@components/button";
import Input from "@components/input";
import Text from "@components/text";
import { fetchUserById, updateUser } from "@actions/users.actions";
import { selectSelectedUser, selectLoading } from "@slices/users.slice";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectSelectedUser);
  const loading = useSelector(selectLoading);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      //@ts-ignore
      dispatch(updateUser({ id: userId, user: formData }));
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      //@ts-ignore
      dispatch(fetchUserById(userId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex justify-center items-center p-8 lg:p-12 lg:items-start">
        <div className="max-w-lg">
          <Text type="title" variant="secondary">Perfil</Text>
          <Text type="subtitle" variant="secondary">Datos personales</Text>
          <Text type="description" variant="secondary">Actualiza tus datos</Text>

          <form className="mt-8 bg-slate-800 rounded-lg p-6 shadow-md space-y-4 w-[50vw]">
            <Text type="description" variant="secondary">Nombre</Text>
            <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Nombre" />

            <Text type="description" variant="secondary">Apellido</Text>
            <Input name="lastname" value={formData.lastname} onChange={handleInputChange} placeholder="Apellido" />

            <Text type="description" variant="secondary">Nombre de usuario</Text>
            <Input name="username" value={formData.username} onChange={handleInputChange} placeholder="Nombre de usuario" />

            <Text type="description" variant="secondary">Correo electrónico</Text>
            <Input name="email" value={formData.email} onChange={handleInputChange} placeholder="Correo electrónico" />

            <br />
            <Button onClick={handleSubmit} className="w-full inline-flex h-12 items-center justify-center rounded bg-zinc-200 px-6 shadow-md outline-none transition duration-200 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:shadow-lg focus:ring">
              Actualizar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;