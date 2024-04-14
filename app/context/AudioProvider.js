import React, { Component, createContext } from "react";
import { Text, View, Alert } from "react-native";
import * as MediaLibrary from 'expo-media-library';

export const AudioContext = createContext()
export class AudioProvider extends Component {
    constructor(props){
        super(props)
    }

    permissionAlert = () => {
        Alert.alert("Permission Required", "This app needs to read audio files!", [{
            text: 'I am ready',
            onPress: () => this.getPermission()
        },{
            text: 'Cancel',
            onPress: () => this.permissionAlert()
        }])
    }

    getAudioFiles = async () => {
        const media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        })
        console.log(media)
    }

    getPermission = async () => {
        //   {
        //       "canAskAgain": true,
        //       "expires": "never",
        //       "granted": false,
        //       "status": "undermined"
        //   }
        const permission = await MediaLibrary.getPermissionsAsync()
        if(permission.granted){
            // we want to get all audio files
            this.getAudioFiles()
        }

        if(!permission.granted && permission.canAskAgain){
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync()
            if(status === 'denied' && canAskAgain){
                // display alert that user must be permitted to run app
                this.permissionAlert()
            }

            if(status === 'granted'){
                // we want to get all audio files
                this.getAudioFiles()
            }

            if(status === 'denied' && !canAskAgain){
                // display error to user
            }
        }
    }

    componentDidMount(){
        this.getPermission()
    }

    render() {
        return <AudioContext.Provider value={{}}>
            {this.props.children}
        </AudioContext.Provider>
    }
}

export default AudioProvider;