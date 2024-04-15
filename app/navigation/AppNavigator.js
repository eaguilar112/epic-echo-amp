import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AudioList from "../screens/AudioList";
import Playlist from "../screens/Playlist";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
    return <Tab.Navigator screenOptions={{
        headerStyle: {backgroundColor: 'lightblue', height: 50,},
        headerTitleAlign: 'center',
        tabBarStyle: { backgroundColor: 'lightblue', paddingBottom: 5, paddingTop: 5,},
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
    }}>
        <Tab.Screen 
            name='AudioList' 
            component={AudioList} 
            options={{
            tabBarIcon: ({color, size}) => (<Ionicons name="headset" size={size} color={color} />)
        }} />
        <Tab.Screen 
            name='Playlist' 
            component={Playlist} options={{
                tabBarIcon: ({color, size}) => (<MaterialIcons name="playlist-play" size={size} color={color} />)
        }} />
    </Tab.Navigator>
}

export default AppNavigator;