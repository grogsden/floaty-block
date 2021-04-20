import React from 'react';
import { View } from 'react-native';

export default function Obstacles({color, obstacalesLeft, obstacleWidth, obstacleHeight, gap}) {
   

    return(
        <>
            <View style={{
            position: 'absolute',
            backgroundColor: '#0d0221',
            borderWidth: 2,
            borderColor: color,
            width: obstacleWidth,
            height: obstacleHeight,
            left: obstacalesLeft,
            bottom: 0 + obstacleHeight + gap,
        }} />
        <View style={{
            position: 'absolute',
            backgroundColor: '#0d0221',
            borderWidth: 2,
            borderColor: color,
            width: obstacleWidth,
            height: obstacleHeight,
            left: obstacalesLeft,
            bottom: 0,
        }} />
        </>

    )
}