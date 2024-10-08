import React from "react";
import { useDispatch } from "react-redux";
import Text from "@components/text";
import Card from "@components/card";
import { DrinksProps } from "@interfaces/drink";
import { ICartItem } from "@interfaces/cart";
import { addToCart, fetchCartTotalQuantity } from "@store/actions/cart.actions";
import { unwrapResult } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";

const DrinksSection: React.FC<DrinksProps> = ({ drinks, error }) => {
  const dispatch = useDispatch();

  const handleAddToCart = async (drinkId: string) => {
    const item: ICartItem = { drinkId, quantity: 1 };
    try {
      const resultAction = await dispatch(addToCart(item) as any);
      unwrapResult(resultAction);
      // @ts-ignore
      dispatch(fetchCartTotalQuantity());
    } catch (error) {
      console.error("Failed to add to cart: ", error);
    }
  };

  const limitedDrinks = drinks.slice(0, 3);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {drinks.length === 0 ? (
        <p className="text-red-500">No hay tragos disponibles</p>
      ) : (
        <div className="flex flex-col items-center md:p-10 py-5">
          <Text className="text-center max-w-xs md:max-w-xl" type="title" variant="secondary">
            Carta de tragos
          </Text>
          <Text className="px-3 text-center max-w-xs md:max-w-xl" type="description" variant="secondary">
            Algunos de los más pedidos y mejores catalogados
          </Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center px-2 py-5">
            {limitedDrinks.map((drink) => (
              <Card
                key={drink._id}
                imageUrl={drink.image}
                title={drink.name}
                description={drink.description}
                price={`$${drink.price}`}
                oldPrice={drink.oldPrice ? `$${drink.oldPrice}` : undefined}
                rating={drink.rating}
                discount={drink.discount}
                onAddToCart={() => handleAddToCart(drink._id)}
              />
            ))}
          </div>
          <Link key='tragos' to='/tragos' className="inline-flex h-12 items-center justify-center rounded bg-zinc-200 px-6 shadow-md outline-none transition duration-200 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:shadow-lg focus:ring">Ver todos los tragos</Link>
        </div>
      )}
    </div>
  );
};

export default DrinksSection;
