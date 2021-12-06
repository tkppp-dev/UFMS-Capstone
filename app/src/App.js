import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from '../navigations/Tab';
import { Provider } from './context/index';
import { Image, SafeAreaView, View } from 'react-native';
import { StatusBar } from 'react-native';

function App() {
  return (
    <Provider>
      <NavigationContainer>
        <SafeAreaView>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
        </SafeAreaView>
        <TabNavigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
