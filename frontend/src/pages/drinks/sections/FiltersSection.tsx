import React from "react";
import Text from "../../../components/Text";
import Button from "../../../components/Button";

interface Filter {
  label: string;
  type: "discount" | "rating";
}

interface FiltersProps {
  selectedFilters: Filter[];
  toggleFilter: (filter: Filter) => void;
}

const Filters: React.FC<FiltersProps> = ({ selectedFilters, toggleFilter }) => {
  const filters: Filter[] = [
    { label: "Descuento 39%", type: "discount" },
    { label: "Descuento 20%", type: "discount" },
    { label: "Rating 5", type: "rating" },
    { label: "Rating 4+", type: "rating" },
  ];

  return (
    <div className="flex flex-col p-4 h-auto bg-transparent md:bg-slate-800">
      <Text className="text-white text-center normal-case" type="subtitle">
        Filtrar búsqueda
      </Text>
      {filters.map((filter) => {
        const isSelected = selectedFilters.some((f) => f.label === filter.label);
        return (
          <div
            key={filter.label}
            className="flex items-center justify-between mb-2"
          >
            <Button
              onClick={() => toggleFilter(filter)}
              className={`${isSelected ? "bg-blue-500 text-white" : "bg-slate-500"}`}
            >
              {filter.label}
            </Button>
            {isSelected && (
              <Button
                onClick={() => toggleFilter(filter)}
                className="text-white shadow-none bg-transparent hover:bg-none hover:shadow-none focus:ring-0"
              >
                &#10005;
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
