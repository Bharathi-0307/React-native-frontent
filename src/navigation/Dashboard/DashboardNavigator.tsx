import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomerStackNavigator from '../child/customer';
import AdminStackNavigator from '../child/admin';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack = createStackNavigator();

const DashboardNavigator = () => {
  // const [userRole, setUserRole] = React.useState('guest');
  const [userRole, setUserRole] = React.useState<string | null>(null);

  useEffect(() => {
    const getUserRole = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserRole(parsedUser.role || 'guest');
      }
    };

    getUserRole();
  }, []);

  if (userRole === null) {
    return null; 
  }

  const initialRoute =
    userRole === 'school_teacher'
      ? 'StudentDashboard'
      : userRole === 'school_student'
      ? 'TeacherDashboard'
      : 'Dashboard';

  return (
    <Stack.Navigator>
      {userRole === 'admin' ? (
        <Stack.Screen
          name="customerNavigator"
          component={CustomerStackNavigator}
          options={{headerShown: false}}
        />
      ) : userRole === 'customer' ? (
        <Stack.Screen
          name="adminNavigator"
          component={AdminStackNavigator}
          options={{headerShown: false}}
        />
      ) : null}
  
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
