import React, { Component, createContext } from "react";
import { View, StyleSheet, Text, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';
import { Audio } from 'expo-av';

export const AudioContext = createContext()
export class AudioProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            audioFiles: [],
            permissionError: false,
            dataProvider: new DataProvider((r1, r2) => r1 !== r2),
            playbackObj: null,
            soundObj: null,
            currentAudio: {},
            isPlaying: false,
            currentAudioIndex: null,
            playbackPosition: null,
            playbackDuration: null,
        };
        this.totalAudioCount = 0
    }

    permissionAlert = () => {
        Alert.alert("Permission Required", "This app must read audio", [{
            text: 'Ready',
            onPress: () => this.getPermission()
        },{
            text: 'Cancel',
            onPress: () => this.permissionAlert()
        }])
    }

    getAudioFiles = async () => {
        const {dataProvider, audioFiles} = this.state
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount,
        });
        this.totalAudioCount = media.totalCount

        this.setState({...this.state, 
            dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]),
            audioFiles: [...audioFiles, ...media.assets]})
    };

    getPermission = async () => {
        //{
        //    "canAskAgain": true,
        //    "expires": "never",
        //    "granted": false,
        //    "status": "undetermined",
        //}
        const permission =  await MediaLibrary.getPermissionsAsync()
        if(permission.granted){
            // get all audio files
            this.getAudioFiles();
        }

        if(!permission.canAskAgain && !permission.granted){
            this.setState({...this.state, permissionError: true})
        }

        if(!permission.granted && permission.canAskAgain){
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
            if(status === 'denied' && canAskAgain){
                // display alert for permission being required
                this.permissionAlert();
            }

            if(status === 'granted'){
                // get all audio files
                this.getAudioFiles();
            }

            if(status === 'denied' && !canAskAgain) {
                // display error to user
                this.setState({...this.state, permissionError: true})
            }
        }
    }

    componentDidMount(){
        this.getPermission();
        if(this.state.playbackObj === null) {
            this.setState({...this.state, playbackObj: new Audio.Sound()});
        }
    }

    updateState = (prevState, newState = {}) => {
        this.setState({...prevState, ...newState})
    }

    render() {
        const {audioFiles, 
                dataProvider, 
                permissionError, 
                playbackObj, 
                soundObj,
                currentAudio, 
                isPlaying, 
                currentAudioIndex,  
                playbackPosition, 
                playbackDuration,} = this.state
        if(permissionError) return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{fontSize: 25, textAlign: 'center', color: 'red'}}>Permission Not Accepted</Text>
            </View>
        )
        return (
            <AudioContext.Provider value={{audioFiles, 
                                            dataProvider, 
                                            playbackObj, 
                                            soundObj, 
                                            currentAudio, 
                                            isPlaying, 
                                            currentAudioIndex, 
                                            playbackPosition, 
                                            playbackDuration,
                                            updateState: this.updateState,
                                            totalAudioCount: this.totalAudioCount,}}>
                {this.props.children}
            </AudioContext.Provider>
        )
    }
}

export default AudioProvider;