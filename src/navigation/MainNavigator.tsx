import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { useAuth } from '../context/AuthContext';

const MainNavigator = () => {
  const {isLoggedIn, isProfileSetupDone, userId, isLoading} = useAuth();


  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#3498db',
    fontWeight: 'bold',
  },
});

export default MainNavigator;
