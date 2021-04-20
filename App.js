import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import Block from './components/block';
import Obstacles from './components/obstacles';

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const blockLeft = screenWidth / 2;
  const [blockBottom, setBlockBottom] = useState(screenHeight/2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 30);
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
  const [score, setScore] =useState(0);
  const obstacleWidth = 90;
  const obstacleHeight = 300;
  const gap = 200;
  const gravity = 3;
  let gameTimerId;
  let obstaclesLeftTimerId;
  let obstaclesLeftTimerIdTwo;
  const [isGameOver, setIsGameOver] = useState(false);
  

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

  //block float

  const float = () => {
    if (!isGameOver && (blockBottom < screenHeight)) {
      setBlockBottom(blockBottom => blockBottom + 50)
      console.log('float')
    }
  }
 

  //start first obstacles
  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft -5)
      }, 30)
      return () => {
        clearInterval(obstaclesLeftTimerId)
      }
    } else {
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight( - Math.random() * 100)
      setScore(score => score +1)
    }
  }, [obstaclesLeft])

  //start second obstacles

  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo -5)
      }, 30)
      return () => {
        clearInterval(obstaclesLeftTimerIdTwo)
      }
    } else {
      setObstaclesLeftTwo(screenWidth)
      setObstaclesNegHeightTwo( - Math.random() * 100)
      setScore(score => score +1)
      
    }
  }, [obstaclesLeftTwo])

 //check for collisions
 useEffect(() => {
  console.log(obstaclesLeft)
  console.log(screenWidth/2)
  console.log(obstaclesLeft > screenWidth/2)
  if (
    ((blockBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
    blockBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
    (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30 )
    )
    || 
    ((blockBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
    blockBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
    (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 )
    )
    ) 
    {
    console.log('game over')
    gameOver()
    }
  })

const gameOver = () => {
  clearInterval(gameTimerId)
  clearInterval(obstaclesLeftTimerId)
  clearInterval(obstaclesLeftTimerIdTwo)
  setIsGameOver(true)
}

  return (
    <TouchableWithoutFeedback onPress={float}>
      <View style={styles.container}>
        {isGameOver && <Text style={styles.text}>{score}</Text>}
        <Block 
          blockBottom={blockBottom}
          blockLeft={blockLeft}
        />
        <Obstacles 
          color={"#f9c80e"}
          obstacalesLeft={obstaclesLeft}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeight}
          gap={gap}
        />
        <Obstacles
          color={'#2de2e6'}
          obstacalesLeft={obstaclesLeftTwo}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeightTwo}
          gap={gap}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0221',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text: {
    fontSize: 100,
    color: '#ff6c11',
  }
});
