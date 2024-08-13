export interface Filter {
    label: string;
    type: "discount" | "rating";
  }

export interface FiltersProps {
    selectedFilters: Filter[];
    toggleFilter: (filter: Filter) => void;
  }