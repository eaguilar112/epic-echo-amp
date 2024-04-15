//Play Audio
export const play = async (playbackObj, uri) => {
    try {
    return await playbackObj.loadAsync({ uri }, { shouldPlay: true });
    } catch (error) {
        console.log('error inside play helper method', error.message);
    };
}

// Pause Audio
export const pause = async (playbackObj) => {
    try {
    return await playbackObj.setStatusAsync({shouldPlay: false});
    } catch (error) {
        console.log('error inside pause helper method', error.message);
    };
}

// Resume Audio
export const resume = async (playbackObj) => {
    try {
    return await playbackObj.playAsync();
    } catch (error) {
        console.log('error inside resume helper method', error.message);
    };
}

// Select Next/Another Audio
export const playNext = async (playbackObj, uri) => {
    try {
        await playbackObj.stopAsync();
        await playbackObj.unloadAsync();
        return await play(playbackObj, uri);
    } catch (error) {
        console.log('error inside playNext helper method', error.message);
    }
}