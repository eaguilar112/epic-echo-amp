import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AudioList from "../screens/AudioList";
import Player from "../screens/Player";
import Playlist from "../screens/Playlist";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
    return <Tab.Navigator>
        <Tab.Screen 
            name='AudioList' 
            component={AudioList} 
            options={{
            tabBarIcon: ({color, size}) => (<Ionicons name="headset" size={size} color={color} />)
        }} />
        <Tab.Screen name='Player' component={Player} />
        <Tab.Screen name='Playlist' component={Playlist} />
    </Tab.Navigator>
}

export default AppNavigator;