import {
  initialState,
  ingredientsReducer,
  fetchIngredients
} from './ingredientsSlice';

describe('тестирование редьюсера ingredientsReducer', () => {
  describe('тестирование экшена fetchIngredients', () => {
    const actions = {
      pending: {
        type: fetchIngredients.pending.type,
        payload: initialState.ingredients
      },
      fulfilled: {
        type: fetchIngredients.fulfilled.type,
        payload: [
          {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0942',
            name: 'Соус Spicy-X',
            type: 'sauce',
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-02-large.png',
            __v: 0
          }
        ]
      },
      rejected: {
        type: fetchIngredients.rejected.type,
        payload: initialState.ingredients
      }
    };

    test('тест экшена fetchIngredients.pending', () => {
      const state = ingredientsReducer(initialState, actions.pending);
      expect(state.ingredients).toBe(initialState.ingredients);
      expect(state.buns).toBe(initialState.buns);
      expect(state.mains).toBe(initialState.mains);
      expect(state.sauces).toBe(initialState.sauces);
      expect(state.isLoading).toBe(true);
    });
    test('тест экшена fetchIngredients.fulfilled', () => {
      const state = ingredientsReducer(initialState, actions.fulfilled);
      expect(state.ingredients).toBe(actions.fulfilled.payload);
      expect(state.buns).toStrictEqual([
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        }
      ]);
      expect(state.mains).toStrictEqual([
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          __v: 0
        }
      ]);
      expect(state.sauces).toStrictEqual([
        {
          _id: '643d69a5c3f7b9001cfa0942',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          __v: 0
        }
      ]);
      expect(state.isLoading).toBe(false);
    });
    test('тест экшена fetchIngredients.rejected', () => {
      const state = ingredientsReducer(initialState, actions.rejected);
      expect(state.ingredients).toBe(initialState.ingredients);
      expect(state.buns).toBe(initialState.buns);
      expect(state.mains).toBe(initialState.mains);
      expect(state.sauces).toBe(initialState.sauces);
      expect(state.isLoading).toBe(initialState.isLoading);
    });
  });
});
