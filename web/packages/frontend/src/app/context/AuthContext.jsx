import React, { createContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  useEffect(() => {
    const retrievedUser = localStorage.getItem('user');
    const retrievedToken = localStorage.getItem('token');
    if(retrievedToken){
      setToken(retrievedToken);
    }
    if(retrievedUser){
      setUser(retrievedUser);
    }
  });

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser}} >
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
