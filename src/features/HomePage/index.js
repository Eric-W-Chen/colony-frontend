import React from 'react';
import { useProfileProvider } from 'contexts/profile';
import { Redirect } from 'react-router-dom';
import Login from 'components/LoginForm';


const HomePage = () => {
  const { state: { loggedIn } } = useProfileProvider();
  return (
    <div className="home-page" style={{ textAlign: 'center' }}>
      { loggedIn ? <Redirect to="/dashboard" /> : <Login /> }
    </div>
  );
};

export default HomePage;
