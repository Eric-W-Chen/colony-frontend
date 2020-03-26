import axios from 'axios';
import PropTypes from 'prop-types';
import React, { createContext, useReducer, useContext } from 'react';

const initialState = { loggedIn: true, name: {} };
const store = createContext(initialState);
const { Provider } = store;

const BASE_URL = 'http://localhost:5000/api';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';
const ITEM = 'ITEM';
const COLONY = 'COLONY';

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

  // const addItem = credentials => axios
  //   .post(`${BASE_URL}/cart`, credentials)
  //   .then(({data}) => {
  //     dispatch({ type: ITEM, payload: data })
  //   });

  // const getCart = () => axios
  //   .get(`${BASE_URL}/cart`)
  //   .then(({data}) => {
  //     dispatch({ type: ITEM, payload: data })
  //   });

  return {
    state,
    dispatch,
    login,
    logout,
    register,
    addColony,
    // addItem,
    // getCart
  };
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProfileProvider, useProfileProvider };
