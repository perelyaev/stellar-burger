import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { getErrorSelector, register } from '../../services/slices/userSlice';

// Component for user registration
export const Register: FC = () => {
  // State variables for user input fields
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const error = useSelector(getErrorSelector);

  // Handler for form submission
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register({ email: email, password: password, name: userName }));
  };

  return (
    // Render user registration UI component
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
