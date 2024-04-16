import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import AudioProvider from './app/appcontext/AudioProvider';
import Player from './app/components/Player';

export default function App() {
    return (
      <AudioProvider>
        <NavigationContainer>
          <AppNavigator/>  
        </NavigationContainer>
      </AudioProvider>
  );
} 
