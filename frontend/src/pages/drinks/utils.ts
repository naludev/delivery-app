// utils.ts
export type FilterType = "rating" | "discount";

export interface Filter {
  label: string;
  type: FilterType;
}

export interface FiltersProps {
  selectedFilters: Filter[];
  toggleFilter: (filter: Filter) => void;
}
