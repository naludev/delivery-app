import React from "react";
import Text from "@components/text.component";
import Rating from "@components/rating.component";
import Trago from '@assets/trago.jpg'

interface CardProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  price: string;
  oldPrice?: string;
  rating?: number;
  discount?: number;
  onAddToCart?: () => void;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  price,
  oldPrice,
  rating = 0,
  discount,
  onAddToCart,
}) => {
  return (
    <div className="relative w-full max-w-xs flex-col overflow-hidden bg-zinc-200 shadow-md rounded flex justify-between">
      <a className="relative mx-3 mt-3 flex h-60 overflow-hidden" href="#">
        <img className="object-cover w-full h-full" src={Trago} alt="product image" />
        {discount && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-red-600 px-2 text-center text-sm font-bold text-white">
            {discount}%
          </span>
        )}
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <Text type="title">{title}</Text>
        </a>
        <Text type="description">{description}</Text>
        <div className="mt-2 mb-5 flex flex-col items-start justify-between">
        <div className="flex">
    <Text type="price">{price}</Text>
    {oldPrice && <Text type="oldPrice">{oldPrice.toString().split('.')[0]}</Text>}
  </div>
  <Rating rating={rating} />
</div>
        {onAddToCart && (
          <a
            href="#"
            onClick={onAddToCart}
            className="flex items-center justify-center rounded-md bg-slate-800 px-5 py-2.5 text-center text-[13px] font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Agregar al carrito
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
