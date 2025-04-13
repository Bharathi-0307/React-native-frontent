const TOKEN_KEY = 'token';

export default TOKEN_KEY;

// EXAMPLE OF TOKEN KEY AND VALUE

// toke key = token value
// token = "shddsdjgfgfjsdduwwewe23232323"



import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (e) {
    console.error('Failed to save token', e);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('@auth_token');
  } catch (e) {
    console.error('Failed to get token', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('@auth_token');
  } catch (e) {
    console.error('Failed to remove token', e);
  }
};