import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import Text from "@components/text";
import Card from "@components/card";
import Search from "@components/search";
import Filters from "./filters.section";
import { DrinksProps } from "@interfaces/drink";
import { ICartItem } from "@interfaces/cart";
import { Filter } from "../utils";
import { addToCart, fetchCartTotalQuantity } from "@store/actions/cart.actions";
import { unwrapResult } from '@reduxjs/toolkit';

const ITEMS_PER_PAGE = 6;

const DrinksSection: React.FC<DrinksProps> = ({ drinks, error }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const toggleFilter = (filter: Filter) => {
    setSelectedFilters(prevFilters =>
      prevFilters.some(f => f.label === filter.label)
        ? prevFilters.filter(f => f.label !== filter.label)
        : [...prevFilters, filter]
    );
    setCurrentPage(1);
  };

  const clearSearch = () => setSearchTerm("");

  const filteredDrinks = useMemo(() => {
    return drinks.filter(drink => {
      const matchesSearchTerm =
        drink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drink.description.toLowerCase().includes(searchTerm.toLowerCase());
  
      const matchesFilters = selectedFilters.every(filter => {
        if (filter.type === "rating") {
          const rating = parseInt(filter.label.replace("Rating ", ""), 10);
          return drink.rating === rating;
        }
        if (filter.type === "discount") {
          const discount = parseInt(filter.label.replace("Descuento ", "").replace("%", ""), 10);
          return drink.discount === discount;
        }
        return true;
      });
  
      return matchesSearchTerm && matchesFilters;
    });
  }, [drinks, searchTerm, selectedFilters]);
  
  const paginatedDrinks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredDrinks.slice(startIndex, endIndex);
  }, [filteredDrinks, currentPage]);
  
  const totalPages = Math.ceil(filteredDrinks.length / ITEMS_PER_PAGE);

  const handleAddToCart = async (drinkId: string) => {
    const item: ICartItem = { drinkId, quantity: 1 };

    try {
      const resultAction = await dispatch(addToCart(item) as any);
      unwrapResult(resultAction);
      //@ts-ignore
      dispatch(fetchCartTotalQuantity());
    } catch (error) {
      console.error('Failed to add to cart: ', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Filters selectedFilters={selectedFilters} toggleFilter={toggleFilter} drinks={drinks} />
      <div className="flex-1 p-5 min-h-[100vw]">
        <Text className="text-center w-full max-w-full" type="title" variant="secondary">Carta de tragos</Text>
        <Text className="text-center w-full max-w-full mt-2" type="description" variant="secondary">Algunos de los más pedidos y mejores catalogados</Text>
        <div className="relative mb-4 w-full">
          <Search value={searchTerm} onChange={(e) => { setCurrentPage(1); setSearchTerm(e.target.value)}} onClear={clearSearch} placeholder="Buscar tragos..." />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {!error && !paginatedDrinks.length && searchTerm && (
          <p className="text-red-500">No se encontraron tragos que coincidan con tu búsqueda</p>
        )}
        {paginatedDrinks.length > 0 && (
          <div className="flex flex-col items-center md:p-2 p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center py-5">
              {paginatedDrinks.map(drink => (
                <Card
                  key={drink._id}
                  imageUrl={drink.image}
                  title={drink.name}
                  description={drink.description}
                  price={`$${drink.price}`}
                  oldPrice={`$${drink.oldPrice}`}
                  rating={drink.rating}
                  discount={drink.discount}
                  onAddToCart={() => handleAddToCart(drink._id)}
                />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
              >
                {`<`}
              </button>
              <span className="px-4 py-2">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
              >
                {`>`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrinksSection;
