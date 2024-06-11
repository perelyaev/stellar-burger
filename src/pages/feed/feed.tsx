import React, { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds, getFeedOrder } from '../../services/slices/feedSlice';

// Component for displaying feed of orders
export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeedOrder);

  // Fetch feed of orders on component mount
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  // Render preloader if orders are not yet loaded
  if (!orders.length) {
    return <Preloader />;
  }

  // Render feed UI with orders and handler to fetch more feeds
  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
