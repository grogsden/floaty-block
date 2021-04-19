import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Block from './components/block';

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const blockLeft = screenWidth / 2;
  const [blockBottom, setBlockBottom] = useState(screenHeight/2);
  const gravity = 3;
  let gameTimerId;

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
  }, [blockBottom])

  return (
    <View style={styles.container}>
      <Block 
        blockBottom={blockBottom}
        blockLeft={blockLeft}
      />
      <StatusBar style="auto" />
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
