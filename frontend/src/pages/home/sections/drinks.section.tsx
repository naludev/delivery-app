import React from "react";
import Text from "../../../components/text.component";
import Card from "../../../components/card.component";
import LinkButtonSolid from "../../../components/solidbutton.component";
import { DrinksProps } from "../../../interfaces/drink.interface";

const DrinksSection: React.FC<DrinksProps> = ({ drinks, error }) => {
  return (
    <div className="bg-gray-900">
      {error ? ( <p className="text-red-500">{error}</p> ) : drinks.length === 0 ? ( <p className="text-red-500">No hay tragos disponibles</p>)
      : (
        <div className="flex flex-col items-center md:p-10 py-5">
          <Text className="text-center max-w-xs md:max-w-xl" type="title" variant="secondary">Carta de tragos</Text>
          <Text className="px-3 text-center max-w-xs md:max-w-xl" type="description" variant="secondary">Algunos de los más pedidos y mejores catalogados</Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center px-2 py-5">
            {drinks.map((drink) => (
              <Card
                key={drink.name}
                imageUrl={drink.image}
                title={drink.name}
                description={drink.description}
                price={`$${drink.price}`}
                oldPrice={`$${drink.oldPrice}`}
                rating={drink.rating}
                discount={drink.discount}
                onAddToCart={() => alert("Added to cart")}
              />
            ))}
          </div>
          <LinkButtonSolid label="Ver tragos" href="/tragos" />
        </div>
      )}
    </div>
  );
};

export default DrinksSection;