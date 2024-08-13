import React, { useState, useMemo } from "react";
import Text from "../../../components/Text";
import Card from "../../../components/Card";
import Filters from "./FiltersSection";
import Search from "../../../components/Search";

interface Drink {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  oldPrice: number;
  discount: number;
  rating: number;
}

interface Filter {
  label: string;
  type: "discount" | "rating";
}

interface DrinksProps {
  drinks: Drink[];
  error: string | null;
}

const DrinksSection: React.FC<DrinksProps> = ({ drinks, error }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);

  const toggleFilter = (filter: Filter) => {
    setSelectedFilters(prevFilters =>
      prevFilters.some(f => f.label === filter.label)
        ? prevFilters.filter(f => f.label !== filter.label)
        : [...prevFilters, filter]
    );
  };

  const clearSearch = () => setSearchTerm("");

  const filteredDrinks = useMemo(() => {
    return drinks.filter(drink => {
      const matchesSearchTerm =
        drink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drink.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters = selectedFilters.every(filter => {
        // if (filter.type === "discount") {
        //   return drink.discount.includes(filter.label);
        // }
        if (filter.type === "rating") {
          return filter.label === "Rating 5" ? drink.rating === 5 : drink.rating >= 4;
        }
        return true;
      });

      return matchesSearchTerm && matchesFilters;
    });
  }, [drinks, searchTerm, selectedFilters]);

  const hasSearchTerm = searchTerm.length > 0;
  const hasResults = filteredDrinks.length > 0;

  return (
    <div className="flex flex-col md:flex-row">
      <Filters selectedFilters={selectedFilters} toggleFilter={toggleFilter} />
      <div className="flex-1 bg-gray-900 p-5 min-h-[100vw]">
        <Text className="text-center w-full max-w-full" type="title" variant="secondary">Carta de tragos</Text>
        <Text className="text-center w-full max-w-full mt-2" type="description" variant="secondary">Algunos de los más pedidos y mejores catalogados</Text>
        <div className="relative mb-4 w-full">
          <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onClear={clearSearch} placeholder="Buscar tragos..." />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {!error && !hasResults && hasSearchTerm && (
          <p className="text-red-500">No se encontraron tragos que coincidan con tu búsqueda</p>
        )}
        {hasResults && (
          <div className="flex flex-col items-center md:p-2 p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center py-5">
              {filteredDrinks.map(drink => (
                <Card
                  key={drink.id}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default DrinksSection;
