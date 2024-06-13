import { initialState, userOrderReducer, getOrder } from './userOrderSlice';

describe('тестирование редьюсера userOrderReducer', () => {
  describe('тестирование экшена getOrder', () => {
    const actions = {
      fulfilled: {
        type: getOrder.fulfilled.type,
        payload: [
          {
            _id: '_id',
            status: 'status',
            name: 'name',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            number: 1,
            ingredients: [
              {
                _id: '_id',
                name: 'name',
                type: 'type',
                proteins: 1,
                fat: 2,
                carbohydrates: 3,
                calories: 4,
                price: 5,
                image: 'image',
                image_large: 'image_large',
                image_mobile: 'image_mobile'
              }
            ]
          }
        ]
      }
    };

    test('тест экшена getOrder.fulfilled', () => {
      const state = userOrderReducer(initialState, actions.fulfilled);
      expect(state.orders).toBe(actions.fulfilled.payload);
    });
  });
});
