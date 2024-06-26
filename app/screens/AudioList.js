import React, { useContext, Component } from "react";
import { StyleSheet, Dimensions } from 'react-native';
import { AudioContext } from "../appcontext/AudioProvider";
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import AudioListItem from "../components/AudioListItem";
import Screen from "../components/Screen";
import OptionModal from "../components/OptionModal";
import { Audio } from 'expo-av';
import { play, pause, resume, playNext } from '../misc/audioController';
import Player from "./Player";
import { storeAudioForNextOpening } from "../misc/helper";
import * as SecureStore from 'expo-secure-store';

export class AudioList extends Component {
    static contextType = AudioContext

    constructor(props){
        super(props);
        this.state = {
            optionModalVisible: false,
        };

        this.currentItem = {

        }
    };

    onPlaybackStatusUpdate = async playbackStatus => {
        if(playbackStatus.isLoaded && playbackStatus.isPlaying){
            this.context.updateState(this.context, {
                playbackPosition: playbackStatus.positionMillis,
                playbackDuration: playbackStatus.durationMillis,
            })
        }

        if(playbackStatus.didJustFinish){
            const nextAudioIndex = this.context.currentAudioIndex + 1;
            // there is no next audio to play
            if(nextAudioIndex >= this.context.totalAudioCount){
                this.context.playbackObj.unloadAsync();
                this.context.updateState(this.context, {
                    soundObj: null,
                    currentAudio: this.context.audioFiles[0],
                    isPlaying: false,
                    currentAudioIndex: 0,
                    playbackPosition: null,
                    playbackDuration: null,
                })
            }
            // otherwise, select next audio
            const audio = this.context.audioFiles[nextAudioIndex];
            const status = await playNext(this.context.playbackObj, audio.uri);
            this.context.updateState(this.context, {
                soundObj: status,
                currentAudio: audio,
                isPlaying: true,
                currentAudioIndex: nextAudioIndex,
            })
        }
    };

    handleAudioPress = async audio => {
        const {soundObj, playbackObj, currentAudio, updateState, audioFiles} = this.context;
        // Playing Audio for First Time
        if(soundObj === null) {       
            const playbackObj = new Audio.Sound();
            const status = await play(playbackObj, audio.uri);
            const index = audioFiles.indexOf(audio);
            updateState(this.context, {currentAudio: audio, playbackObj: playbackObj, soundObj: status, isPlaying: true, currentAudioIndex: index,});
            playbackObj.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
            return storeAudioForNextOpening(audio, index);
        };

        // Pause Audio
        if(soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id){
            const status = await pause(playbackObj);
            return updateState(this.context, {soundObj: status, isPlaying: false,});
        };

        // Resume Audio
        if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id){
            const status = await resume(playbackObj);
            return updateState(this.context, {soundObj: status, isPlaying: true,});
        }

        // Select Other Audio
        if(soundObj.isLoaded && currentAudio.id !== audio.id){
            const status = await playNext(playbackObj, audio.uri);
            const index = audioFiles.indexOf(audio);
            return updateState(this.context, {currentAudio: audio, soundObj: status, isPlaying: true, currentAudioIndex: index,});
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

    componentDidMount() {
        this.context.loadPreviousAudio();
    }

    rowRenderer = (type, item, index, extendedState) => {
        return (
            <AudioListItem 
                style={styles.container}
                title={item.filename} 
                isPlaying={extendedState.isPlaying}
                activeListItem={this.context.currentAudioIndex === index}
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
                {({ dataProvider, isPlaying }) => {
                    if(!dataProvider._data.length) return null;
                    return (
                        <Screen>
                            <RecyclerListView 
                                dataProvider={dataProvider} 
                                layoutProvider={this.layoutProvider} 
                                rowRenderer={this.rowRenderer} 
                                extendedState={{isPlaying}}
                            />
                            <OptionModal onPlayListPress={() => {this.context.updateState(this.context, {addToPlayList: this.currentItem}) 
                                            this.props.navigation.navigate('PlayList')}} 
                                        onPlayPress={() => console.log('Playing audio')} 
                                        currentItem={this.currentItem} 
                                        onClose={() => this.setState({...this.state, optionModalVisible: false }) } 
                                        visible={this.state.optionModalVisible}/>
                        </Screen>
                    );
                }}
            </AudioContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container:{

    }
})

export default AudioList;