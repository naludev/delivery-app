import { useEffect } from "react";
import HeaderSection from "./sections/header.section";
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
          <HeaderSection />
          <StepsSection steps={stepsData} />
          <OfferSection />
          <DrinksSection drinks={drinks} error={error} />
        </div>
      )}
    </div>
  );
};

export default Home;
