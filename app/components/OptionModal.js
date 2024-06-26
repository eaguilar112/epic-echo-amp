import React from "react";
import { View, Text, StyleSheet, Modal, StatusBar, TouchableWithoutFeedback } from 'react-native';
import color from "../misc/color";

const OptionModal = ({ visible, currentItem, onClose, onPlayPress, onPlayList }) => {
    const {filename} = currentItem
    return <>
    <StatusBar />
    <Modal animationType='fade' transparent visible={visible}>
        <View style={styles.modal}>
            <Text numberOfLines={2} style={styles.title}>{filename}</Text>
            <View style={styles.optionContainer}>
                <TouchableWithoutFeedback onPress={onPlayPress} >
                    <Text style={styles.option}>Play</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={onPlayList} >
                    <Text style={styles.option}>Add to Playlist</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
    </Modal>
    </>
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'darkblue',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1000,
    },
    optionContainer: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
        color: 'white',
    },
    option: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#D3D3D3',
        padding: 10,
        letterSpacing: 1,
    },
    modalBg: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: color.MODAL_BG,
    },
});

export default OptionModal;