import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearAll,
  getConstructorSelector
} from '../../services/slices/constructorSlice';
import { getIsAuthCheckedSelector } from '../../services/slices/userSlice';

import { useNavigate } from 'react-router-dom';
import {
  clearOrder,
  getOrderState,
  postOrder
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { constructorItems } = useSelector(getConstructorSelector);
  const user = useSelector(getIsAuthCheckedSelector);
  const { orders, request } = useSelector(getOrderState);

  const onOrderClick = () => {
    if (!constructorItems.bun || request) return;
    if (!user) navigate('/login');
    dispatch(
      postOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((i) => i._id),
        constructorItems.bun._id
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearAll());
    navigate('/login');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={request}
      constructorItems={constructorItems}
      orderModalData={orders}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
