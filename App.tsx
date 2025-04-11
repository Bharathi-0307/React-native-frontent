

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StackNavigator />
//     </NavigationContainer>
//   );
// }

import React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import MainNavigator from './src/navigation/MainNavigator';

const App = () => (
  <AuthProvider>
    <MainNavigator />
  </AuthProvider>
);

export default App;
