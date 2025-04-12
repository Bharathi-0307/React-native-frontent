import React from 'react';
import {Image, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardNavigator from './Dashboard/DashboardNavigator';
import { ProductListScreen } from '../screens/Admin/ProductManagement/ProductListScreen';
const dashboardIcon = require('../assets/images/favicon.png');
const collaborationIcon = require('../assets/images/favicon.png');
const profileIcon = require('../assets/images/favicon.png');

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}: {route: {name: string}}) => ({
        tabBarIcon: ({focused}: {focused: boolean}) => {
          let iconSource;
          if (route.name === 'Dashboard') {
            iconSource = dashboardIcon;
          } else if (route.name === 'Collaboration') {
            iconSource = collaborationIcon;
          } else if (route.name === 'Profile') {
            iconSource = profileIcon;
          }

          return (
            <Image
              source={iconSource}
              style={[styles.icon, {tintColor: focused ? '#AB2959' : 'gray'}]}
            />
          );
        },
        tabBarActiveTintColor: '#AB2959',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Dashboard" component={DashboardNavigator} />
      <Tab.Screen name="ProductList" component={ProductListScreen} />

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffff',
    elevation: 0,
    borderTopWidth: 0,
    height: 60,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default AppNavigator;
