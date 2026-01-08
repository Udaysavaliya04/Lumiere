import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
        setUser(userInfo);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } else {
      throw new Error(data.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  const register = async (name, email, password) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } else {
      throw new Error(data.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
