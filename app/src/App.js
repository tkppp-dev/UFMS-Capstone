import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from '../navigations/Tab';
import { Provider } from './context/index';

function App() {
  return (
    <Provider>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
