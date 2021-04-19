import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



export default function Block({ blockBottom, blockLeft }) {
const blockWidth = 50;
const blockHeight = 60;

    return (
        <View style={{
            position: 'absolute',
            backgroundColor: '#f6019d',
            width: blockWidth,
            height: blockHeight,
            left: blockLeft - (blockWidth/2),
            bottom: blockBottom - (blockHeight/2)
        }}>
        </View>
    )
}

