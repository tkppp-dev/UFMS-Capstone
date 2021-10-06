import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import StackNavigation from '../navigations/Stack';
import TabNavigation from '../navigations/Tab';

function App() {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}

export default App;
