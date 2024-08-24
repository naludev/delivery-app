import { useEffect } from "react";
import { AppDispatch } from "@store/config";
import Text from "@components/text";
import { fetchDrinks } from "@store/actions/drinks.actions";
import deliveryimg from "@assets/drinksimg.jpeg";
import { useDispatch } from "react-redux";
import { renderSection, sections } from "./utils";
import LinkButtonSolid from "@components/solidbutton";

const Acerca: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDrinks());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-0 max-h-full lg:p-5 z-10">
      <Text className="text-center w-full max-w-full mb-0" type="title" variant="secondary">Acerca de nosotros</Text>
      <Text className="text-center w-full max-w-full mt-2" type="description" variant="secondary">Tu cóctel favorito, ahora a un clic de distancia</Text>
      <div className="flex flex-col lg:flex-row h-full gap-10 p-5 items-center">
        <div className="flex justify-center w-full lg:w-1/2 h-full">
          <img className="object-contain rounded" src={deliveryimg} alt="Logo" />
        </div>
        <div className="flex flex-col gap-4 flex-1 lg:flex-col lg:gap-8 items-center">
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col gap-4 lg:flex-row lg:gap-8">
              {renderSection(section)}
            </div>
          ))}
            <LinkButtonSolid className="mt-5 w-[100%]" label="únite al club" href="/tragos" />
        </div>
      </div>
    </div>
  );
};

export default Acerca;
