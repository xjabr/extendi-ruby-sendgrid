import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode';

import { AUTH_ENDPOINT } from '../constants/API_ENDPOINTS';
import { httpPost } from '../utils/http';

const AuthContext = React.createContext({});
const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  const allowedPaths = [
    '/login',
    '/signup'
  ]

  useEffect(() => {
    const _token = localStorage.getItem('access_token_extendi');
    if (!_token) {
      if (allowedPaths.includes(window.location.pathname)) return ;
      return window.location.href = '/login';
    }

    let decoded = jwt(_token, { complete: true });
    let dateNow = new Date();

    if (dateNow.getTime() <= decoded.exp) {
      setIsLoggedIn(false);
      localStorage.removeItem('access_token_extendi');

      if (allowedPaths.includes(window.location.pathname)) return ;
      return window.location.href = '/login';
    }

    setIsLoggedIn(true);
    setUserData({}); // todo fill
    setToken(_token);
  }, []);

  const authenticate = async (body) => {
    const response = {
      data: null,
      error: null,
      status: null
    }
  
    try {
      const result = await httpPost(`${AUTH_ENDPOINT}/login`, null, body);
      response.data = result.data;
      response.status = result.status;

      saveToken(result.data);
    } catch (error) {
      response.error = error.response.data;
      response.status = error.response.status;
    }

    return response;
  }

  const signup = async (body) => {
    const response = {
      data: null,
      error: null,
      status: null
    }
  
    try {
      const result = await httpPost(`${AUTH_ENDPOINT}/signup`, null, body);
      response.data = result.data;
      response.status = result.status;
    } catch (error) {
      response.error = error.response.data;
      response.status = error.response.status;
    }

    return response;
  }

  const saveToken = (data) => {
    localStorage.setItem('access_token_extendi', data.token);
    setToken(data.token);
    setUserData({});
    setIsLoggedIn(true);
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      userData,
      token,
      authenticate,
      signup
    }} {...props} />
  )
}

const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth }