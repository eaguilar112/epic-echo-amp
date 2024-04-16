import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AudioList from "../screens/AudioList";
import Playlist from "../screens/Playlist";
import Player from "../screens/Player";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
    return (
        <LinearGradient
            colors={['#3030D6', '#00109C']} // Gradient colors
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }} // Gradient start point
            end={{ x: 1, y: 1 }} // Gradient end point
        >
        <Tab.Navigator screenOptions={{
            headerStyle: {backgroundColor: '#3030D6', height: 50,},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            tabBarStyle: { backgroundColor: '#0060DE', paddingBottom: 5, paddingTop: 5,},
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: '#000C7A',
        }}>
            <Tab.Screen 
                name='AudioList' 
                component={AudioList} 
                options={{
                tabBarIcon: ({color, size}) => (<Ionicons name="headset" size={size} color={color} />)
            }} />
            <Tab.Screen 
                name='Player' 
                component={Player} 
                options={{
                tabBarIcon: ({color, size}) => (<Ionicons name="play" size={size} color={color} />)
            }} />
            <Tab.Screen 
                name='Playlist' 
                component={Playlist} options={{
                    tabBarIcon: ({color, size}) => (<MaterialIcons name="playlist-play" size={size} color={color} />)
            }} />
        </Tab.Navigator>
        </LinearGradient>
    )
}

export default AppNavigator;