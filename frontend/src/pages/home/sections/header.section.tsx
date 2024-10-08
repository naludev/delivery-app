import React from "react";
import Logo from "@assets/instatragos.png";
import Text from "@components/text";
import { Link } from "react-router-dom";

const HeaderSection: React.FC = () => {
  return (
    <header className="relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/14866145/pexels-photo-14866145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
      <div className="relative mx-auto flex flex-col md:max-w-screen-xl md:flex-row">
        <div className="my-auto mx-auto md:my-24 lg:max-w-screen-xl">
          <div className="mb-16 bg-slate-900 bg-opacity-80 p-12 flex flex-col items-center">
            <div className="mb-6 p-4 flex flex-col items-center">
              <img className="object-cover w-40 h-full mb-4" src={Logo} alt="product image" />
              <div className="flex flex-col items-center">
                <Text className="px-3 text-white text-center" type="title">Tus tragos al instante</Text>
                <Text className="px-3 text-white text-center max-w-xs md:max-w-xl" type="description">
                  Insta Tragos UY te lleva tus tragos favoritos al instante, con una selección exclusiva y entrega rápida para disfrutar donde quieras.
                </Text>
                <Text type="description" className="py-3 text-white">Venta de alcohol solo a mayores de 18 años</Text>
              </div>
            </div>
            <div className="flex items-center gap-5">
            <Link key='tragos' to='/tragos' className="inline-flex h-12 items-center justify-center rounded bg-zinc-200 px-6 shadow-md outline-none transition duration-200 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:shadow-lg focus:ring">Ver tragos</Link>
            <Link key='tragos' to='/acerca' className="inline-flex h-12 items-center justify-center rounded text-zinc-200 px-6 shadow-md outline-none transition duration-200 text-xs font-semibold uppercase tracking-wider hover:shadow-lg focus:ring">Acerca de</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
