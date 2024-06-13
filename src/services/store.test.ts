import store from './store';
import { rootReducer } from './rootReducer';

test('проверка работы rootReducer', () => {
  const expected = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  expect(expected).toEqual(store.getState());
});
