import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen';
import SignupScreen from '../screens/Auth/RegisterScreen/SignupScreen';
import RegisterStep1 from '../screens/Auth/CustomerRegistration/RegisterStep1';
import RegisterStep2 from '../screens/Auth/CustomerRegistration/RegisterStep2';
import RegisterStep3 from '../screens/Auth/CustomerRegistration/RegisterStep3';
import { ProductListScreen } from '../screens/Admin/ProductManagement/ProductListScreen';
import CustomerDashboardScreen from '../screens/Dashboard/CustomerDashboardScreen';

// TEST FOR TEMP IMPORT 



const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CustomerDashboard">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup1"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={RegisterStep1}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="RegisterStep2" component={RegisterStep2} />
      <Stack.Screen name="RegisterStep3" component={RegisterStep3} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="CustomerDashboard" component={CustomerDashboardScreen} />




    </Stack.Navigator>
  );
};

export default AuthNavigator;
