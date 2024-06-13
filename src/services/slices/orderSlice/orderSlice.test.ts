import { initialState, orderReducer, postOrder } from './orderSlice';

describe('тестирование редьюсера orderReducer', () => {
  describe('тестирование экшена postOrder', () => {
    const actions = {
      pending: {
        type: postOrder.pending.type
      },
      fulfilled: {
        type: postOrder.fulfilled.type,
        payload: {
          order: {
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
          },
          name: 'name'
        },
        error: { message: initialState.error }
      },
      rejected: {
        type: postOrder.rejected.type,
        payload: {
          order: initialState.orders,
          name: initialState.name
        },
        error: { message: 'error' }
      }
    };

    test('тест экшена postOrder.pending', () => {
      const state = orderReducer(initialState, actions.pending);
      expect(state.orders).toBe(initialState.orders);
      expect(state.name).toBe(initialState.name);
      expect(state.request).toBe(true);
      expect(state.error).toBe(initialState.error);
    });
    test('тест экшена postOrder.fulfilled', () => {
      const state = orderReducer(initialState, actions.fulfilled);
      expect(state.orders).toBe(actions.fulfilled.payload.order);
      expect(state.name).toBe(actions.fulfilled.payload.name);
      expect(state.request).toBe(false);
      expect(state.error).toBe(actions.fulfilled.error.message);
    });
    test('тест экшена postOrder.rejected', () => {
      const state = orderReducer(initialState, actions.rejected);
      expect(state.orders).toBe(initialState.orders);
      expect(state.name).toBe(initialState.name);
      expect(state.request).toBe(initialState.request);
      expect(state.error).toBe(actions.rejected.error.message);
    });
  });
});
