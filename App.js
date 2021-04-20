import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Block from './components/block';
import Obstacles from './components/obstacles';

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const blockLeft = screenWidth / 2;
  const [blockBottom, setBlockBottom] = useState(screenHeight/2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 30);
  const obstacleWidth = 60;
  const obstacleHeight = 300;
  const gap = 200;
  const gravity = 3;
  let gameTimerId;
  let obstacalesLeftTimerId;
  let obstacalesLeftTimerIdTwo;

  //start block falling
  useEffect(() => {
    if (blockBottom > 0 ) {
      gameTimerId = setInterval(() => {
        setBlockBottom(blockBottom => blockBottom - gravity)
      }, 30)
      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [blockBottom]);
 

  //start first obstacles
  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      obstacalesLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft -5)
      }, 30)
      return () => {
        clearInterval(obstacalesLeftTimerId)
      }
    } else {
      setObstaclesLeft(screenWidth)
    }
  }, [obstaclesLeft])

  //start second obstacles

  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obstacalesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo -5)
      }, 30)
      return () => {
        clearInterval(obstacalesLeftTimerIdTwo)
      }
    } else {
      setObstaclesLeftTwo(screenWidth)
    }
  }, [obstaclesLeftTwo])


  return (
    <View style={styles.container}>
      <Block 
        blockBottom={blockBottom}
        blockLeft={blockLeft}
      />
      <Obstacles 
        color={"#f9c80e"}
        obstacalesLeft={obstaclesLeft}
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        gap={gap}
      />
      <Obstacles
        color={'#2de2e6'}
        obstacalesLeft={obstaclesLeftTwo}
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        gap={gap}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0221',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
