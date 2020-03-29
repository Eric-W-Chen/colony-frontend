import axios from 'axios';
import PropTypes from 'prop-types';
import React, { createContext, useReducer, useContext } from 'react';

const initialState = { loggedIn: false, name: {} };
const store = createContext(initialState);
const { Provider } = store;

const BASE_URL = 'https://animal-colony-76d9b.firebaseapp.com/api';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';
const ITEM = 'ITEM';
const COLONY = 'COLONY';
const ANIMALS = 'ANIMALS';

axios.defaults.withCredentials = true;

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer((prevState, action) => {
    const { type, payload } = action;

    switch (type) {
      case LOGIN: {
        // Store the profile data in the state
        return { ...prevState, loggedIn: true, ...payload };
      }

      case REGISTER: {
        return { ...prevState, loggedIn: true, ...payload };
      }

      case ITEM: {
        return { ...prevState, ...payload };
      }

      case COLONY: {
        return { ...prevState, ...payload };
      }

      case ANIMALS: {
        return { ...prevState, ...payload };
      }

      case LOGOUT: {
        // Reset state to logged out
        return initialState;
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

const useProfileProvider = () => {
  const { state, dispatch } = useContext(store);

  const login = credentials => axios
    .post(`${BASE_URL}/login`, credentials)
    .then(({ data }) => {
      dispatch({ type: LOGIN, payload: data });
    });

  const register = credentials => axios
    .post(`${BASE_URL}/user`, credentials)
    .then(({ data }) => {
      dispatch({ type: REGISTER, payload: data });
    });

  const logout = () => dispatch({
    type: LOGOUT,
  });

  const addColony = newColony => axios
    .post(`${BASE_URL}/colony`, newColony)
    .then(({ data }) => {
      dispatch({ type: COLONY, payload: data });
    });

  const getAnimals = pageInfo => axios
    .post(`${BASE_URL}/colony/animals`, pageInfo)
    .then(({ data }) => {
      dispatch({ type: ANIMALS, payload: data });
    });

  return {
    state,
    dispatch,
    login,
    logout,
    register,
    addColony,
    getAnimals,
  };
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProfileProvider, useProfileProvider };
