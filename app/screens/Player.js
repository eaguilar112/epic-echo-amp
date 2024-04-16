import React, { useContext } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { AudioContext } from "../appcontext/AudioProvider";
import Slider from '@react-native-community/slider';
import PlayerButton from "../components/PlayerButton";
import { play, pause, resume, playNext } from '../misc/audioController';

const Player = () => {
    const context = useContext(AudioContext);

    const { playbackPosition, playbackDuration, } = context;

    const calculateSeekBar = () => {
        if(playbackPosition !== null && playbackDuration !== null){
            return playbackPosition / playbackDuration;
        }
        return 0
    }

    const handlePlayPause = () => {
        // play
        if(context.soundObj === null)
        // pause
        // resume
    }

    return (
        <View style={styles.playerContainer}>
            <Text>{`${context.currentAudioIndex + 1} / ${context.totalAudioCount}`}</Text>
            <Text numberOfLines={1}>{context.currentAudio.filename}</Text>
            {
            <Slider
            style={{width: 275, height: 40}}
            minimumValue={0}
            maximumValue={1}
            value={calculateSeekBar()}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
              />
            }
                <View style={styles.audioController}>
                    <PlayerButton iconType='PREVIOUS'></PlayerButton>
                    <PlayerButton onPress={() => console.log('playing')} iconType={context.isPlaying ? 'PLAY' : 'PAUSE'}></PlayerButton>
                    <PlayerButton iconType='NEXT'></PlayerButton>
                </View>
        </View>
    )
}

const styles=StyleSheet.create({
    playerContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    audioController: {
        backgroundColor: 'transparent',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 35,
    },
})

export default Player;