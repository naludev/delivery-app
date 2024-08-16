import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@store/config";
import { fetchDrinks } from "@store/actions/drinks.actions";
import { selectDrinks, selectLoading, selectError } from "@store/slices/drinks.slice";
import DrinksSection from "./sections/drinks.section";

const Drinks: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const drinks = useSelector(selectDrinks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchDrinks());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DrinksSection drinks={drinks} error={error} />
      )}
    </div>
  );
};

export default Drinks;
