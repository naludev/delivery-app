import { useEffect, useRef, useState } from "react";
import HeaderSection from "./sections/header.section";
import AboutSection from "./sections/about.section";
import DrinksSection from "./sections/drinks.section";
import OfferSection from "./sections/offer.section";
import StepsSection from "./sections/steps.section";
import { AppDispatch } from "@store/config";
import { selectDrinks, selectError, selectLoading } from "@store/slices/drinks.slice";
import { fetchDrinks } from "@store/actions/drinks.actions";
import img1 from "@assets/drinks.png";
import img2 from "@assets/cart.png";
import img3 from "@assets/enjoy.png";
import { useDispatch, useSelector } from "react-redux";

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const drinks = useSelector(selectDrinks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchDrinks());
  }, [dispatch]);

  const aboutRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToAbout = () => {
    if (!isScrolling && aboutRef.current) {
      setIsScrolling(true);
      aboutRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  const stepsData = [
    { title: "Paso 1", description: "Elige tus tragos de preferencia de nuestra amplia variedad de opciones", img: img1 },
    { title: "Paso 2", description: "Agrégalos a tu carrito y revisa los detalles de tu pedido", img: img2 },
    { title: "Paso 3", description: "Finaliza tu compra completando tus datos y disfruta de la entrega rápida", img: img3 },
  ];

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
        {/* @ts-ignore */}
          <HeaderSection scrollToAbout={scrollToAbout} />
          <div ref={aboutRef} className="flex flex-col md:flex-row">
            <AboutSection />
            <OfferSection />
          </div>
          <DrinksSection drinks={drinks} error={error} />
          <StepsSection steps={stepsData} />
        </div>
      )}
    </div>
  );
};

export default Home;
