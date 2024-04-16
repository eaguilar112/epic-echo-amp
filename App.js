import React from 'react'
import {NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import AudioProvider from './app/appcontext/AudioProvider';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#3030D6',
  },
};

export default function App() {
    return (
      <AudioProvider>
        <NavigationContainer theme={MyTheme}>
          <AppNavigator/>  
        </NavigationContainer>
      </AudioProvider>
  );
} 
