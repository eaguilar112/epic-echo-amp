import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { AudioContext } from "../appcontext/AudioProvider";
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import AudioListItem from "../components/AudioListItem";
import Screen from "../components/Screen";
import OptionModal from "../components/OptionModal";
import { Audio } from 'expo-av';
import { play, pause, resume, playNext } from '../misc/audioController';

export class AudioList extends Component {
    static contextType = AudioContext

    constructor(props){
        super(props);
        this.state = {
            optionModalVisible: false,
        };

        this.currentItem = {

        }
    }

    handleAudioPress = async audio => {
        const {soundObj, playbackObj, currentAudio, updateState} = this.context;
        // Playing Audio for First Time
        if(soundObj === null) {       
            const playbackObj = new Audio.Sound();
            const status = await play(playbackObj, audio.uri);
            return updateState(this.context, {currentAudio: audio, playbackObj: playbackObj, soundObj: status,});
        };

        // Pause Audio
        if(soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id){
            const status = await pause(playbackObj);
            return updateState(this.context, {soundObj: status});
        };

        // Resume Audio
        if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id){
            const status = await resume(playbackObj);
            return updateState(this.context, {soundObj: status});
        }

        // Select Other Audio
        if(soundObj.isLoaded && currentAudio.id !== audio.id){
            const status = await playNext(playbackObj, audio.uri);
            return updateState(this.context, {currentAudio: audio, soundObj: status,});
        }
    };

    layoutProvider = new LayoutProvider(i => 'audio', (type, dim) => {
        switch(type) {
            case 'audio':
                dim.width = Dimensions.get('window').width;
                dim.height = 70;
                break;
                default:
                    dim.width = 0;
                    dim.height = 0;
        }
    })

    rowRenderer = (type, item) => {
        return (
            <AudioListItem 
                title={item.filename} 
                duration={item.duration} 
                onAudioPress={() => this.handleAudioPress(item)}
                onOptionPress={() => {
                    this.currentItem = item
                    this.setState({...this.state, optionModalVisible: true})
            }}/>
        );
    };

    render() {
        return (
            <AudioContext.Consumer>
                {({ dataProvider }) => {
                    return (
                        <Screen>
                            <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer} />
                            <OptionModal onPlayList={() => console.log('Added to Playlist')} onPlayPress={() => console.log('Playing audio')} currentItem={this.currentItem} onClose={() => this.setState({...this.state, optionModalVisible: false }) } visible={this.state.optionModalVisible}/>
                        </Screen>
                    );
                }}
            </AudioContext.Consumer>
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