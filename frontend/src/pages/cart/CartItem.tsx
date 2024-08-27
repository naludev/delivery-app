import { FC, memo } from 'react';
import Text from "@components/text";
import QuantityInput from "@components/inputqty";
import Papelera from '@assets/papelera.png';

interface CartItemProps {
  item: any;
  editedQuantities: { [key: string]: number };
  onIncrement: (drinkId: string, quantity: number) => void;
  onDecrement: (drinkId: string, quantity: number) => void;
  onQuantityChange: (drinkId: string, quantity: number) => void;
  onRemove: (drinkId: string) => void;
}

const CartItem: FC<CartItemProps> = memo(({ item, editedQuantities, onIncrement, onDecrement, onQuantityChange, onRemove }) => (
  <li key={item._id} className="flex flex-col md:flex-row justify-between bg-slate-800 rounded items-center mb-4">
    <div className="flex flex-row gap-5 w-full">
      <img className="h-52 w-52 hidden md:block" src={item.image} alt="trago" />
      <div className="flex flex-col text-left [text-align-last:start] self-center">
        <Text className="w-full" type="title" variant="secondary">{item.name}</Text>
        <Text className="w-full mt-2" type="description" variant="secondary">{item.description}</Text>
      </div>
    </div>
    <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0 p-12">
      <QuantityInput value={editedQuantities[item.drinkId] || item.quantity} onIncrement={() => onIncrement(item.drinkId, editedQuantities[item.drinkId] || item.quantity)} onDecrement={() => onDecrement(item.drinkId, editedQuantities[item.drinkId] || item.quantity)} onChange={(value) => onQuantityChange(item.drinkId, value)} />
      <Text className="text-white font-bold" type="description">${item.price}</Text>
      <img className="w-5 invert cursor-pointer" src={Papelera} alt="vaciar carrito" onClick={() => onRemove(item.drinkId)} />
    </div>
  </li>
));

export default CartItem;
