// @ts-nocheck
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, selectCartLoading } from "../../store/slices/cart.slice";
import { AppDispatch } from "../../store/config";
import { fetchCart, fetchCartTotalQuantity, removeFromCart, clearCart, updateCartQuantity } from "../../store/actions/cart.actions";
import Text from "../../components/text.component";
import Button from "../../components/button.component";
import QuantityInput from "../../components/inputqty.component";
import DrinkImage from '../../assets/trago.jpg';
import Papelera from '../../assets/papelera.png';

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector(selectCart) || { items: [], totalPrice: 0 };
  const loading = useSelector(selectCartLoading);
  const [editedQuantities, setEditedQuantities] = useState<{ [key: string]: number }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCartTotalQuantity());
  }, [cart, dispatch]);

  useEffect(() => {
    if (cart.items) {
      setTotalPrice(cart.totalPrice);
    }
  }, [cart]);

  const handleRemoveFromCart = async (drinkId: string) => {
    await dispatch(removeFromCart(drinkId));
    dispatch(fetchCart());
    const updatedCart = await dispatch(fetchCart());
    if (updatedCart) {
      setTotalPrice(updatedCart.totalPrice);
    }
  };

  const handleClearCart = async () => {
    await dispatch(clearCart());
    dispatch(fetchCart());
    setTotalPrice(0);
  };

  const handleQuantityChange = async (drinkId: string, quantity: number) => {
    setEditedQuantities(prev => ({ ...prev, [drinkId]: quantity }));
    if (quantity > 0) {
      await dispatch(updateCartQuantity({ drinkId, quantity }));
      dispatch(fetchCartTotalQuantity());
      dispatch(fetchCart());
    } else {
      alert("Quantity must be at least 1");
    }
  };

  const handleIncrement = (drinkId: string, quantity: number) => {
    handleQuantityChange(drinkId, quantity + 1);
  };

  const handleDecrement = (drinkId: string, quantity: number) => {
    if (quantity > 1) {
      handleQuantityChange(drinkId, quantity - 1);
    } else {
      alert("Quantity must be at least 1");
    }
  };

  return (
    <div className="p-10 mb-10 [min-height:100vh] flex flex-col items-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Text className="text-center w-full max-w-4xl" type="title" variant="secondary">Carrito</Text>
          <Text className="text-center w-full max-w-4xl mt-2" type="description" variant="secondary">Completa la compra de tus tragos favoritos</Text>
          <br />
          <ul className="w-full max-w-4xl">
            {Array.isArray(cart.items) && cart.items.length > 0 ? (
              cart.items.map((item: any) => (
                <li key={item._id} className="px-12 py-8 flex flex-col md:flex-row justify-between bg-slate-800 rounded items-center mb-4">
                  <div className="flex flex-row gap-5 w-full">
                    <img className="h-28 w-28 hidden md:block" src={DrinkImage} alt="trago" />
                    <div className="flex flex-col text-left [text-align-last:start]">
                      <Text className="w-full" type="title" variant="secondary">{item.name}</Text>
                      <Text className="w-full mt-2" type="description" variant="secondary">{item.description}</Text>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
                    <QuantityInput
                      value={editedQuantities[item.drinkId] || item.quantity}
                      onIncrement={() => handleIncrement(item.drinkId, editedQuantities[item.drinkId] || item.quantity)}
                      onDecrement={() => handleDecrement(item.drinkId, editedQuantities[item.drinkId] || item.quantity)}
                      onChange={(value) => handleQuantityChange(item.drinkId, value)}
                    />
                    <Text className="text-white font-bold" type="description">${item.price}</Text>
                    <img className="w-5 invert cursor-pointer" src={Papelera} alt="vaciar carrito" onClick={() => handleRemoveFromCart(item.drinkId)} />
                  </div>
                </li>
              ))
            ) : (
              <Text className="text-white font-bold mt-5 text-center" type="description">Agrega items al carrito</Text>
            )}
          </ul>
          {Array.isArray(cart.items) && cart.items.length > 0 && ((
            <div className="w-full max-w-4xl mt-5 flex flex-col items-end">
              <Text className="text-white font-bold text-lg" type="description">Total ${totalPrice.toFixed(2)}</Text>
              <Button className="flex items-center justify-center rounded-md bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 mt-5 gap-1" onClick={handleClearCart}>
                <img className="w-4 invert" src={Papelera} alt="vaciar carrito" /> Vaciar carrito
              </Button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Cart;
