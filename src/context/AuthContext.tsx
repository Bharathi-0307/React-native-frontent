import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, removeToken, storeToken } from '../config/tokenConfig';
import api from '../config/httpclient';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await getToken();
      setToken(storedToken);
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      console.log('Full login response:', response);
      if (response && response.data && response.data.token) {
      
        await AsyncStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        console.log('Logged in user:', response.data.user);
        return response.data; 
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  
  

  const logout = async () => {
    await removeToken();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);