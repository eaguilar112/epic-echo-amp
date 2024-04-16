import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import color from "../misc/color";
import PlayListInputModal from "../components/PlaylistInputModal";
import { AudioContext } from "../appcontext/AudioProvider";
import * as SecureStore from 'expo-secure-store';

const Playlist = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const context = useContext(AudioContext);
    const {playList, addToPlayList, updateState} = context

    const createPlayList = async playListName => {
        const result = await SecureStore.getItemAsync('playlist');
        if(result !== null){
            const audios =[];
            if(addToPlayList){
                audios.push(addToPlayList);
            }
            const newList = {
                id: Date.now(),
                title: playListName,
                audios: audios,
            }

            const updatedList = [...playList, newList];
            updateState(context, {addToPlayList: null, playList: updatedList});
            await SecureStore.setItemAsync('playlist', JSON.stringify(data));
        }
        setModalVisible(false);
    }

    const renderPlayList = async () => {
        const result = await SecureStore.getItemAsync('playlist');
        if(result === null){
            const defaultPlayList = {
                id: Date.now(),
                title: 'My Favourite',
                audios: [],
            }

            const newPlayList = [...playList, defaultPlayList];
            updateState(context, {playList: [...newPlayList]});
            return await SecureStore.setItem('playlist', JSON.stringify(data));
        }

        updateState(context, {playList: JSON.parse(r)});
    }

    useEffect(() => {
        if(!playList.length){
            renderPlayList()
        }
    })

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {playList.length ? playList.map(item => <TouchableOpacity ky={item.id.toString()} style={styles.playlistBanner}>
                <Text>My Favorite</Text>
                <Text style={styles.audioCount}>{item.audios.length > 1 ? `${item.audios.length} Songs` : `${item.audios.length} Song`}</Text>
            </TouchableOpacity>): null}
                        
            <FlatList data={playList} keyExtractor={item => item.id.toString()} renderItem={({item}) => <Text>{item.title}</Text>} />

            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginTop: 15 }}> 
                <Text style={styles.playlistBanner}>+ Add New Playlist</Text>
            </TouchableOpacity>

            <PlayListInputModal visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={createPlayList}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        padding: 20
    },
    playlistBanner: {
        padding: 5,
        backgroundColor: 'lightblue',
        borderRadius: 5,
        marginBottom: 15,
    },
    titleFave: {
        color: 'white',
    },
    audioCount: {
        marginTop: 3,
        opacity: 0.5,
        fontSize: 14,
        color: 'lightgray',
    },
    playlistBtn: {
        color: color.ACTIVE_FONT,
        letterSpacing: 1,
        fontSize: 14,
        fontWeight: 'bold',
        padding: 5,
        backgroundColor: 'rgba(204,204,204,0.3)',
        borderRadius: 5,
    },  
});

export default Playlist;