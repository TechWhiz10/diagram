import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
    //   axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { token })
    //     .then(response => {
    //       login(response.data);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //       logout();
    //     });
    }
  }, [token]);

  const login = (data) => {
    setToken(data.token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
