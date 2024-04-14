import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Entypo } from '@expo/vector-icons';
import color from '../misc/color';

const AudioListItem = ({title, duration}) => {
    return (
        <>
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={styles.thumbnail}>
                    <Text style={styles.thumbnailText}>A</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.title}>{title}</Text>
                    <Text style={styles.timeText}>{duration}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Entypo name="dots-three-vertical" size={24} color={color.FONT_MEDIUM} />
            </View>
        </View>
        <View style={styles.separator}/>
        </>
    )
}

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: width - 80,
        backgroundColor: 'lightblue',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rightContainer: {
        flexBasis: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    thumbnail: {
        height: 50,
        flexBasis: 50,
        backgroundColor: color.FONT_LIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    thumbnailText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: color.FONT,
    },
    titleContainer: {
        width: width - 180,
        paddingLeft: 10,
    },
    title: {
        fontSize: 16,
        color: color.FONT,
    },
    separator: {
        width: width -80,
        backgroundColor: '#333',
        opacity: 0.3,
        height: 0.5,
        alignSelf: 'center',
        marginTop: 10,
    },
    timeText: {
        fontSize: 14,
        color: 'black',
    },
})

export default AudioListItem;