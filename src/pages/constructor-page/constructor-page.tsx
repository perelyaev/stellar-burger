import React, { FC } from 'react';
import { useSelector } from '../../services/store';
import styles from './constructor-page.module.css';
import { BurgerIngredients, BurgerConstructor } from '../../components/';
import { Preloader } from '@ui';

// Component for the constructor page
export const ConstructorPage: FC = () => {
  // Check if ingredients are loading
  const isIngredientsLoading = useSelector(
    (state) => state.ingredients.isLoading
  );

  return (
    <>
      {isIngredientsLoading ? ( // Display preloader while ingredients are loading
        <Preloader />
      ) : (
        // Display main content when ingredients are loaded
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />{' '}
            {/* Component to display burger ingredients */}
            <BurgerConstructor />{' '}
            {/* Component to display burger constructor */}
          </div>
        </main>
      )}
    </>
  );
};
