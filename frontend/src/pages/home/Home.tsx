import { useEffect, useState, useRef } from "react";
import axios from "axios";
import HeaderSection from "./sections/HeaderSection";
import AboutSection from "./sections/AboutSection";
import DrinksSection from "./sections/DrinksSection";
import OfferSection from "./sections/OfferSection";
import StepsSection from "./sections/StepsSection";
import img1 from "../../assets/drinks.png";
import img2 from "../../assets/cart.png";
import img3 from "../../assets/enjoy.png";
import Footer from "../../components/Footer";

interface Drink {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  oldPrice: number;
  rating: number;
}

const API_URL = "http://localhost:3000/api/drinks";

const Home: React.FC = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [error, setError] = useState<string | null>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

  const stepsData = [
    { title: "Paso 1", description: "Elige tus tragos de preferencia de nuestra amplia variedad de opciones", img: img1 },
    { title: "Paso 2", description: "Agrégalos a tu carrito y revisa los detalles de tu pedido", img: img2 },
    { title: "Paso 3", description: "Finaliza tu compra completando tus datos y disfruta de la entrega rápida", img: img3 },
  ];

  return (
    <div>
      <HeaderSection scrollToAbout={scrollToAbout} />
      <div ref={aboutRef} className="flex flex-col md:flex-row">
        <AboutSection />
        <OfferSection />
      </div>
      <DrinksSection drinks={drinks} error={error} />
      <StepsSection steps={stepsData} />
      <Footer />
    </div>
  );
};

export default Home;
