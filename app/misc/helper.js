import * as SecureStore from 'expo-secure-store';

export const storeAudioForNextOpening = async (audio, index) => {
    await SecureStore.setItemAsync('previousAudio', JSON.stringify(data));
}