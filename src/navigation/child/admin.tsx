import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AdminDashboard from '../../screens/Admin/AdminDashboard';


const Stack = createStackNavigator();

const AdminStackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AdminHome">
                <Stack.Screen 
                    name="AdminHome" 
                    component={AdminDashboard} 
                    options={{ title: 'Admin Home' }} 
                />
           
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AdminStackNavigator;