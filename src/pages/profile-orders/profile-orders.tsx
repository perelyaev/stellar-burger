import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrder } from '../../services/slices/userOrderSlice';

// Component to display user profile orders
export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  // Select user orders from Redux store
  const orders: TOrder[] = useSelector((state) => state.userOrder.orders);

  // Fetch user orders on component mount
  useEffect(() => {
    dispatch(getOrder());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
