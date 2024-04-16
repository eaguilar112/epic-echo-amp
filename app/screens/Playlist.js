import React from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';

const Playlist = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.playlistBanner}>
                <Text>My Favorite</Text>
                <Text style={styles.audioCount}>0 Songs</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        padding: 20
    },
    audioCount: {
        marginTop: 3,
        opacity: 0.5,
        fontSize: 14,
    },
    playlistBanner: {
        padding: 5,
        backgroundColor: 'rgba(204,204,204,0.3',
        borderRadius: 5,
    },  
});

export default Playlist;