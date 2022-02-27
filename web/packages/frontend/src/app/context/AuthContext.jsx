import React, { createContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
export const AuthContext = createContext();

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1], 'base64'));
  } catch (e) {
    return null;
  }
};
export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState('');
  const [isLogged,setLogged] = useState(false)
  const [favoriteStations, setFavoriteStations] = useState([]);

  useEffect(() => {
    const retrievedUser = localStorage.getItem('user');
    const retrievedToken = localStorage.getItem('token');
    if(retrievedToken){
      const decodedJwt = parseJwt(retrievedToken);
      if ((decodedJwt?.exp||0) > (new Date().getTime() + 1) / 1000) {
        if(retrievedUser){
          setUser(retrievedUser);
        }
        setLogged(true)
      }
    }
  },[]);

  return (
    <AuthContext.Provider value={{ user, setUser, favoriteStations, setFavoriteStations,isLogged,setLogged}} >
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
