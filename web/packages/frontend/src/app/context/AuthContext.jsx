import React, { createContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  //rajouter user
  const [token, setToken] = useState('');
  useEffect(() => {
    const retrievedToken = localStorage.getItem('token');
    if(retrievedToken){
      setToken(retrievedToken);
    }
  });

  return (
    <AuthContext.Provider value={[ token, setToken ]} >
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
