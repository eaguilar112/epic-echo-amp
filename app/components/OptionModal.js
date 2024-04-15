import React from "react";
import { View, Text, StyleSheet, Modal, StatusBar } from 'react-native';
import color from "../misc/color";

const OptionModal = ({visible}) => {
    return <>
    <StatusBar hidden />
    <Modal transparent visible={visible}>
        <View style={styles.modal}>
            <Text numberOfLines={2} style={styles.title}>Dynamic Title of audio is looooooooooooooooooooooooooooooooong</Text>
            <View style={styles.optionContainer}>
                <Text style={styles.option}>Play</Text>
                <Text style={styles.option}>Add to Playlist</Text>
            </View>
        </View>
        <View style={styles.modalBg} />
    </Modal>
    </>
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: color.APP_BG,
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
        color: color.FONT_MEDIUM,
    },
    option: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.FONT,
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