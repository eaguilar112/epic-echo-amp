import React from "react";
import { View, StyleSheet } from 'react-native';

const Screen = ({children}) => {
    return (
        <View style={styles.container}>{children}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3030D6',
    }
})

export default Screen;