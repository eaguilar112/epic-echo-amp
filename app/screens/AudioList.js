import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { AudioContext } from "../forcontext/AudioProvider";
import { LayoutProvider, RecyclerListView } from 'recyclerlistview';

export class AudioList extends Component {
    static contextType = AudioContext;

    layoutProvider = new LayoutProvider((i) => 'audio', (type, dim) => {
        dim.width = Dimensions.get('window').width;
        dim.height = 5;
    })

    rowRenderer = (type, item) => {
        return <Text>{item.filename}</Text>
    }

    render() {
        return <AudioContext.Consumer>
            {({dataProvider}) => {
                return <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer} />
            }}
        </AudioContext.Consumer>
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
})

export default AudioList;