import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import AudioProvider from './app/appcontext/AudioProvider';

export default function App() {
    return (
      <AudioProvider>
        <NavigationContainer>
          <AppNavigator/>
        </NavigationContainer>
      </AudioProvider>
  );
} 
