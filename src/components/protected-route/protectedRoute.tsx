import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIsAuthCheckedSelector } from '../../services/slices/userSlice';
import { Preloader } from '../ui/preloader';

type TProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: TProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector(getIsAuthCheckedSelector);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay); // Очистка таймера при размонтировании компонента
  }, []);

  if (isLoading) {
    // Показываем состояние загрузки, пока происходит проверка аутентификации
    return <Preloader />;
  }

  if (!isAuthChecked && !onlyUnAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (isAuthChecked && onlyUnAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
