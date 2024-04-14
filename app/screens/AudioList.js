import React, { Component } from "react";
import { View, StyleSheet, Text } from 'react-native';

export class AudioList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Audio List</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
})

export default AudioList;