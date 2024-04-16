import React from "react";
import { AntDesign } from '@expo/vector-icons';

const PlayerButton = ({iconType, size = 40, onPress, }) => {
    const getIconName = (type) => {
        switch(type) {
            case 'PLAY':
                return 'pausecircle';
            case 'PAUSE':
                return 'play';
            case 'NEXT':
                return 'stepforward';
            case 'PREVIOUS':
                return 'stepbackward';
        }
    }
    return (
        <AntDesign onPress={onPress} name={getIconName(iconType)} size={size} color='white' />
    )
}

export default PlayerButton;