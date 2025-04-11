import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen';
import SignupScreen from '../screens/Auth/RegisterScreen/SignupScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="ProfileSetup"
        component={ProfileSetupNavigator}
        options={{headerShown: false}}
      /> */}
   
    </Stack.Navigator>
  );
};

export default AuthNavigator;
