import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dimensions} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {FloatingAction} from 'react-native-floating-action';

const windowWidth = Dimensions.get('window').width;

function HomeScreen() {
  return (
    <LinearGradient
      colors={['#c2c8c5', '#ddddda']}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
      <FloatingAction color="#c2c8c5" />
    </LinearGradient>
  );
}

export default HomeScreen;
