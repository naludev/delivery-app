// @ts-nocheck
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, selectCartLoading } from "@store/slices/cart.slice";
import { AppDispatch } from "@store/config";
import { fetchCart, fetchCartTotalQuantity, removeFromCart, clearCart, updateCartQuantity } from "@store/actions/cart.actions";
import Text from "@components/text";
import Button from "@components/button";
import QuantityInput from "@components/inputqty";
import Modal from "@components/modal";
import DrinkImage from '@assets/trago.jpg';
import Papelera from '@assets/papelera.png';
import LinkButtonSolid from "@components/solidbutton";
import Carrito from "@assets/cart.png";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cart = useSelector(selectCart) || { items: [], totalPrice: 0 };
  const loading = useSelector(selectCartLoading);
  const [editedQuantities, setEditedQuantities] = useState<{ [key: string]: number }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

    const handleFinishPurchase = async () => {
    await dispatch(clearCart());
    dispatch(fetchCart());
    setTotalPrice(0);
    navigate('/')
  };

  const handleQuantityChange = async (drinkId: string, quantity: number) => {
    setEditedQuantities(prev => ({ ...prev, [drinkId]: quantity }));
    if (quantity > 0) {
      await dispatch(updateCartQuantity({ drinkId, quantity }));
      dispatch(fetchCartTotalQuantity());
      dispatch(fetchCart());
    }
  };

  const handleIncrement = (drinkId: string, quantity: number) => {
    handleQuantityChange(drinkId, quantity + 1);
  };

  const handleDecrement = (drinkId: string, quantity: number) => {
    if (quantity > 1) {
      handleQuantityChange(drinkId, quantity - 1);
    }
  };

  return (
    <div className="p-10 mb-10 [min-height:100vh] flex flex-col items-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Text className="text-center w-full max-w-4xl" type="title" variant="secondary">Carrito</Text>
          <Text className="text-center w-full max-w-4xl" type="description" variant="secondary">Completa la compra de tus tragos favoritos</Text>
          <br />
          <ul className="w-full max-w-4xl">
            {Array.isArray(cart.items) && cart.items.length > 0 ? (
              cart.items.map((item: any) => (
                <li key={item._id} className="flex flex-col lg:flex-row justify-between bg-slate-800 rounded items-center mb-4">
                  <img className="md:hidden object-cover w-2/5 h-40 md:h-48 shadow-lg" src={item.image} alt="trago" />
                  <div className="flex flex-row gap-5 w-full">
                    <img className="h-52 w-52 hidden md:block" src={item.image} alt="trago" />
                    <div className="flex flex-col text-left [text-align-last:start] self-center p-4">
                      <Text className="w-full" type="title" variant="secondary">{item.name}</Text>
                      <Text className="w-full mt-2" type="description" variant="secondary">{item.description}</Text>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0 p-12">
                    <QuantityInput value={editedQuantities[item.drinkId] || item.quantity} onIncrement={() => handleIncrement(item.drinkId, editedQuantities[item.drinkId] || item.quantity)} onDecrement={() => handleDecrement(item.drinkId, editedQuantities[item.drinkId] || item.quantity)} onChange={(value) => handleQuantityChange(item.drinkId, value)} />
                    <Text className="text-white font-bold" type="description">${item.price}</Text>
                    <img className="w-5 invert cursor-pointer" src={Papelera} alt="vaciar carrito" onClick={() => handleRemoveFromCart(item.drinkId)} />
                  </div>
                </li>
              ))
            ) : (
              <Text className="text-white font-bold mt-5 text-center" type="description">Agrega tragos al carrito</Text>
            )}
          </ul>
          {Array.isArray(cart.items) && cart.items.length > 0 && ((
            <div className="w-full max-w-4xl mt-5 flex flex-col items-end">
              <Text className="text-white font-bold text-lg" type="description">Total ${totalPrice.toFixed(2)}</Text>
              <div className="flex flex-col sm:flex-row-reverse gap-5 w-full sm:w-auto">
              <Button className="gap-1 inline-flex h-12 items-center justify-center rounded bg-white px-6 shadow-md outline-none transition duration-200 text-xs font-semibold uppercase tracking-wider text-slate-800 hover:shadow-lg focus:ring" onClick={() => handleFinishPurchase()}>
                <img className="w-4" src={Carrito} alt="Finalizar compra" />Finalizar compra
              </Button>
              <Button className="gap-1 inline-flex h-12 items-center justify-center rounded bg-red-600 px-6 shadow-md outline-none transition duration-200 text-xs font-semibold uppercase tracking-wider text-white hover:shadow-lg focus:ring" onClick={() => setIsModalOpen(true)}>
                <img className="w-4 invert" src={Papelera} alt="vaciar carrito" /> Vaciar carrito
              </Button>
              </div>
            </div>
          ))}
        </>
      )}
         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={async () => { await handleClearCart(); setIsModalOpen(false); }} title="vaciar carrito" message="¿Estás seguro de que deseas vaciar el carrito?" />
    </div>
  );
};

export default Cart;
