import { ApiResponseModel } from '../models/apiResponseModel';
import { LoginForm, SignupForm } from '../models/authModel';
import React, {createContext, useState, useContext, useEffect} from 'react';
import AuthService from '../services/authService/AuthService';
import { handleApiError } from '../utils/handleError';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import TOKEN_KEY from 'src/config/tokenConfig';


interface User {
  fullname: string;
  email: string;
  phone_number: string;
  role: number;
  token: string;
  userId: string;
}

interface AuthContextType {
  isProfileSetupDone: boolean;
  isLoggedIn: boolean;
  userId: string | null;
  userRole: string | null;
  isLoading: boolean;
  isOnboardingDoneState: boolean | null;
  user: User | null;
  authToken: string | null;
  login: (loginData: LoginForm) => Promise<any>;
  signup: (signupData: SignupForm) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isProfileSetupDone, setIsProfileSetupDone] = useState<boolean>(false);

  const [isOnboardingDoneState, setIsOnboardingDoneState] = useState<
    boolean | null
  >(null);

  const login = async (loginData: LoginForm): Promise<ApiResponseModel> => {
    try {
      const response: ApiResponseModel = await AuthService.doLogin(loginData);

      console.log('Login response', response);
      if (response.success && response.data) {
        const loggedUser = response.data;

        if (loggedUser && loggedUser.token) {
          const {token, ...userWithoutToken} = loggedUser;
          const isProfileSetupDone = userWithoutToken.isProfileSetupDone;
          setIsProfileSetupDone(isProfileSetupDone);
          setUser(userWithoutToken);
          setUserId(userWithoutToken.userId);
          setUserRole(userWithoutToken.role?.toString());
          setAuthToken(token);
          // await AsyncStorage.setItem('user', JSON.stringify(userWithoutToken));
          // await AsyncStorage.setItem(TOKEN_KEY, token);
          // await AsyncStorage.setItem('userId', userWithoutToken.userId);
          // await AsyncStorage.setItem(
          //   'userRole',
          //   userWithoutToken.role?.toString(),
          // );

          setisLoggedIn(true);
          return response;
        }
      }
      return response;
    } catch (error) {
      const errorMessage = handleApiError(error);
      return {
        success: false,
        message: errorMessage,
        data: null,
        error: (error as any).message,
      };
    }
  };

  const signup = async (signupData: SignupForm): Promise<ApiResponseModel> => {
    try {
      const response: ApiResponseModel = await AuthService.doSignup(signupData);
      if (response.success && response.data) {
        setUser(response.data);
        return response;
      }
      return response;
    } catch (error) {
      const errorMessage = handleApiError(error);
      return {
        success: false,
        message: errorMessage,
        data: null,
        error: (error as any).message,
      };
    }
  };

  const logout = async () => {
    try {
      // await AsyncStorage.removeItem('user');
      // await AsyncStorage.removeItem(TOKEN_KEY);
      // await AsyncStorage.removeItem('userId');
      // await AsyncStorage.removeItem('userRole');
      setUser(null);
      setUserId(null);
      setUserRole(null);
      setAuthToken(null);
      setisLoggedIn(false);
      setIsProfileSetupDone(false);
    } catch (error) {
      console.error('Logout error', error);
      throw error;
    }
  };

  const isTokenAvailable = async () => {
    setIsLoading(true);
    try {
      // const token = await AsyncStorage.getItem(TOKEN_KEY);
      // const user = await AsyncStorage.getItem('user');
      // const userId = await AsyncStorage.getItem('userId');
      // const userRole = await AsyncStorage.getItem('userRole');
      // if (token && user) {
      //   setAuthToken(token);
      //   setUser(JSON.parse(user));
      //   setUserId(userId);
      //   setUserRole(userRole);
      //   setisLoggedIn(true);
      // }
    } catch (error) {
      console.error('Error checking token availability', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isTokenAvailable();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isOnboardingDoneState,
        isLoggedIn,
        isLoading,
        userId,
        userRole,
        user,
        authToken,
        login,
        signup,
        logout,
        isProfileSetupDone,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
