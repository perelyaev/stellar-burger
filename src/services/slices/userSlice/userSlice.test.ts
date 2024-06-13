import {
  initialState,
  userReducer,
  register,
  login,
  logout,
  getUser,
  updateUser
} from './userSlice';

describe('тестирование редьюсера userSlice', () => {
  describe('тестирование экшена register', () => {
    const actions = {
      pending: {
        type: register.pending.type,
        payload: { user: initialState.user },
        error: { message: initialState.error }
      },
      fulfilled: {
        type: register.fulfilled.type,
        payload: { user: { name: 'userName', email: 'user@email.com' } },
        error: { message: initialState.error }
      },
      rejected: {
        type: register.rejected.type,
        payload: { user: initialState.user },
        error: { message: 'Ошибка регистрации' }
      }
    };

    test('тест синхронного экшена register.pending', () => {
      const state = userReducer(initialState, actions.pending);
      expect(state.isAuthChecked).toBe(false);
      expect(state.user).toBe(actions.pending.payload.user);
      expect(state.error).toBe(actions.pending.error.message);
    });
    test('тест синхронного экшена register.fulfilled', () => {
      const state = userReducer(initialState, actions.fulfilled);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBe(actions.fulfilled.payload.user);
      expect(state.error).toBe(actions.fulfilled.error.message);
    });
    test('тест синхронного экшена register.rejected', () => {
      const state = userReducer(initialState, actions.rejected);
      expect(state.isAuthChecked).toBe(false);
      expect(state.user).toBe(actions.rejected.payload.user);
      expect(state.error).toBe(actions.rejected.error.message);
    });
  });
  describe('тестирование экшена login', () => {
    const actions = {
      pending: {
        type: login.pending.type,
        payload: { user: initialState.user },
        error: { message: initialState.error }
      },
      fulfilled: {
        type: login.fulfilled.type,
        payload: { user: { name: 'userName', email: 'user@email.com' } },
        error: { message: initialState.error }
      },
      rejected: {
        type: login.rejected.type,
        payload: { user: initialState.user },
        error: { message: 'Ошибка авторизации' }
      }
    };

    test('тест экшена login.pending', () => {
      const state = userReducer(initialState, actions.pending);
      expect(state.isAuthChecked).toBe(false);
      expect(state.user).toBe(actions.pending.payload.user);
      expect(state.error).toBe(actions.pending.error.message);
    });
    test('тест экшена login.fulfilled', () => {
      const state = userReducer(initialState, actions.fulfilled);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBe(actions.fulfilled.payload.user);
      expect(state.error).toBe(actions.fulfilled.error.message);
    });
    test('тест экшена login.rejected', () => {
      const state = userReducer(initialState, actions.rejected);
      expect(state.isAuthChecked).toBe(false);
      expect(state.user).toBe(actions.rejected.payload.user);
      expect(state.error).toBe(actions.rejected.error.message);
    });
  });
  describe('тестирование экшена logout', () => {
    const actions = {
      fulfilled: {
        type: logout.fulfilled.type,
        payload: { user: initialState.user },
        error: { message: initialState.error }
      }
    };

    test('тест экшена logout.fulfilled', () => {
      const state = userReducer(initialState, actions.fulfilled);
      expect(state.isAuthChecked).toBe(false);
      expect(state.user).toBe(actions.fulfilled.payload.user);
      expect(state.error).toBe(actions.fulfilled.error.message);
    });
  });
  describe('тестирование экшена getUser', () => {
    const actions = {
      pending: {
        type: getUser.pending.type,
        payload: { user: initialState.user },
        error: { message: initialState.error }
      },
      fulfilled: {
        type: getUser.fulfilled.type,
        payload: { user: { name: 'userName', email: 'user@email.com' } },
        error: { message: initialState.error }
      },
      rejected: {
        type: getUser.rejected.type,
        payload: { user: initialState.user },
        error: { message: 'Ошибка получения пользователя' }
      }
    };

    test('тест экшена getUser.pending', () => {
      const state = userReducer(initialState, actions.pending);
      expect(state.isAuthChecked).toBe(false);
      expect(state.user).toBe(actions.pending.payload.user);
      expect(state.error).toBe(actions.pending.error.message);
    });

    test('тест экшена getUser.fulfilled', () => {
      const state = userReducer(initialState, actions.fulfilled);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBe(actions.fulfilled.payload.user);
      expect(state.error).toBe(actions.fulfilled.error.message);
    });

    test('тест экшена getUser.rejected', () => {
      const state = userReducer(initialState, actions.rejected);
      expect(state.isAuthChecked).toBe(false);
      expect(state.user).toBe(actions.rejected.payload.user);
      expect(state.error).toBe(actions.rejected.error.message);
    });
  });
  describe('тестирование экшена updateUser', () => {
    const actions = {
      pending: {
        type: updateUser.pending.type,
        payload: { user: initialState.user },
        error: { message: initialState.error }
      },
      fulfilled: {
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'userName', email: 'user@email.com' } },
        error: { message: initialState.error }
      },
      rejected: {
        type: updateUser.rejected.type,
        payload: { user: initialState.user },
        error: { message: 'Ошибка обновления пользователя' }
      }
    };

    test('тест экшена updateUser.pending', () => {
      const state = userReducer(initialState, actions.pending);
      expect(state.isAuthChecked).toBe(false);
      expect(state.user).toBe(actions.pending.payload.user);
      expect(state.error).toBe(actions.pending.error.message);
    });
    test('тест экшена updateUser.fulfilled', () => {
      const state = userReducer(initialState, actions.fulfilled);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBe(actions.fulfilled.payload.user);
      expect(state.error).toBe(actions.fulfilled.error.message);
    });
    test('тест экшена updateUser.rejected', () => {
      const state = userReducer(initialState, actions.rejected);
      expect(state.isAuthChecked).toBe(false);
      expect(state.user).toBe(actions.rejected.payload.user);
      expect(state.error).toBe(actions.rejected.error.message);
    });
  });
});
