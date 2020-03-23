import React from 'react';
import { useProfileProvider } from 'contexts/profile';
import { Redirect } from 'react-router-dom';
import Login from 'components/LoginForm';


const HomePage = () => {
  const { state, state: { loggedIn } } = useProfileProvider();
  return (
    <div className="home-page" style={{ textAlign: 'center' }}>
      <h1>Welcome to the HomePage, the future home of greatness!</h1>
      <h2>{JSON.stringify(state)}</h2>
      {loggedIn ? <Redirect to="/dashboard" /> : <Login />}
    </div>
  );
};

export default HomePage;
