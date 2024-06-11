import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredientId } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const id = useParams();
  const ingredientData = useSelector((state) => getIngredientId(state, id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
