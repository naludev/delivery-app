import React from "react";
import Text from "@components/text";
import LinkButtonSolid from "@components/solidbutton";
import HomeDrink from "@assets/homedrink.jpg";

const OfferSection: React.FC = () => {
  return (
    <div className="relative w-full flex items-center justify-center bg-gray-100 overflow-hidden">
      <img className="absolute inset-0 object-cover w-full h-full brightness-50" src={HomeDrink} alt="Product Image" />
      <div className="relative flex items-center justify-center w-full max-w-6xl mx-auto p-8">
        <div className="flex flex-col md:flex-row items-center justify-between w-full bg-slate-900 bg-opacity-90 p-6 shadow-xl">
          <div className="flex-1 flex items-center justify-center md:justify-start">
            <img className="object-cover w-2/5 h-40 md:h-48 shadow-lg" src={HomeDrink} alt="Product" />
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start md:p-6">
            <Text className="text-white text-center md:text-left" type="title" variant="primary">¡Celebra con Insta Tragos!</Text>
            <Text className="text-white text-center md:text-left" type="subtitle" variant="primary">Aprovecha nuestras ofertas exclusivas en tragos seleccionados</Text>
            <Text className="text-white text-center md:text-left">No te pierdas las mejores promociones y los tragos más sabrosos de la temporada.</Text>
            <LinkButtonSolid className="self-end" label="Explorar Ofertas" href="/tragos" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferSection;
