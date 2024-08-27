import React from "react";
import Button from "@components/button";
import { FiltersProps, Filter, FilterType } from "../utils";

const Filters: React.FC<FiltersProps & { drinks: any[] }> = ({ selectedFilters, toggleFilter, drinks }) => {
  const uniqueRatings = Array.from(new Set(drinks.map(drink => drink.rating)));
  const uniqueDiscounts = Array.from(new Set(drinks.map(drink => drink.discount)));

  const filters: Filter[] = [
    ...uniqueDiscounts.map(discount => ({
      label: `Descuento ${discount}%`,
      type: "discount" as FilterType,
    })),
    ...uniqueRatings.map(rating => ({
      label: `Rating ${rating}`,
      type: "rating" as FilterType,
    })),
  ];

  return (
    <div className="flex flex-col p-4 h-auto bg-transparent">
      {filters.map((filter) => {
        const isSelected = selectedFilters.some((f) => f.label === filter.label);
        return (
          <div key={filter.label} className="flex items-center justify-between mb-2">
            <Button onClick={() => toggleFilter(filter)} className={`${isSelected ? "bg-blue-500 text-white" : "bg-slate-500"}`}>{filter.label}</Button>
            {isSelected && (
              <Button onClick={() => toggleFilter(filter)} className="text-white shadow-none bg-transparent hover:bg-none hover:shadow-none focus:ring-0">&#10005;</Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
