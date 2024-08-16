export interface Drink {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    oldPrice: number;
    rating: number;
    discount: number;
  }

  export interface DrinksProps {
    drinks: Drink[];
    error?: string | null;
  }