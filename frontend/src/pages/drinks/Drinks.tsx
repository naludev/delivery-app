import { useEffect, useState } from "react";
import axios from "axios";
import DrinksSection from "./sections/DrinksSection";
import Footer from "../../components/Footer";

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

const API_URL = "http://localhost:3000/api/drinks";

const Drinks: React.FC = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const { data } = await axios.get<Drink[]>(API_URL);
        setDrinks(data);
      } catch (err) {
        setError("Error fetching drinks.");
        console.error("Error fetching drinks:", err);
      }
    };

    fetchDrinks();
  }, []);

  return (
    <div>
      <DrinksSection drinks={drinks} error={error} />
      <Footer />
    </div>
  );
};

export default Drinks;
