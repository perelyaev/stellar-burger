import { initialState, feedsReducer, getFeeds } from './feedSlice';

describe('тестирование редьюсера feedsReducer', () => {
  describe('тестирование экшена getFeeds', () => {
    const actions = {
      pending: {
        type: getFeeds.pending.type,
        error: { message: initialState.error }
      },
      fulfilled: {
        type: getFeeds.fulfilled.type,
        payload: {
          orders: ['order1', 'order2'],
          total: 1,
          totalToday: 1
        },
        error: { message: initialState.error }
      },
      rejected: {
        type: getFeeds.rejected.type,
        error: { message: 'Error' }
      }
    };

    test('тест экшена getFeeds.pending', () => {
      const state = feedsReducer(initialState, actions.pending);
      expect(state.orders).toEqual(initialState.orders);
      expect(state.total).toEqual(initialState.total);
      expect(state.totalToday).toEqual(initialState.totalToday);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(actions.pending.error.message);
    });
    test('тест экшена getFeeds.fulfilled', () => {
      const state = feedsReducer(initialState, actions.fulfilled);
      expect(state.orders).toEqual(actions.fulfilled.payload.orders);
      expect(state.total).toEqual(actions.fulfilled.payload.total);
      expect(state.totalToday).toEqual(actions.fulfilled.payload.totalToday);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(actions.fulfilled.error.message);
    });
    test('тест экшена getFeeds.rejected', () => {
      const state = feedsReducer(initialState, actions.rejected);
      expect(state.orders).toEqual(initialState.orders);
      expect(state.total).toEqual(initialState.total);
      expect(state.totalToday).toEqual(initialState.totalToday);
      expect(state.loading).toBe(initialState.loading);
      expect(state.error).toBe(actions.rejected.error.message);
    });
  });
});
