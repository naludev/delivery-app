import React from "react";
import Text from "@components/text.component";
import LinkButtonSolid from "@components/solidbutton.component";
import Oferta from "@assets/oferta.png";

const OfferSection: React.FC = () => {
  return (
    <div className="w-full md:w-1/2 flex flex-col">
      <div className="bg-slate-800 bg-opacity-60 p-12 flex flex-col items-center">
        <div className="p-4 flex flex-col items-center">
          <img className="object-cover w-40 h-full mb-4" src={Oferta} alt="product image" />
          <div className="flex flex-col items-center">
            <Text className="px-3 text-white text-center max-w-xs md:max-w-xl" type="description">
              Celebra con Insta Tragos y aprovecha nuestras ofertas exclusivas en tragos seleccionados
            </Text>
            <Text type="description" className="py-3 text-white font-bold">
              ¡Solo por tiempo limitado!
            </Text>
          </div>
        </div>
        <LinkButtonSolid label="Ver ofertas" href="/tragos" />
      </div>
    </div>
  );
};

export default OfferSection;
