import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dimensions} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;

const actions = [
  {
    text: 'Amazon',
    icon: <Icon name="amazon" size={30} />,
    name: 'amazon',
    position: 1,
    color: '#FFFFFFF00',
    textBackground: '#FFFFFFF00',
    textStyle: {fontSize: 20},
    textColor: '#FFFFFFF',
  },
];
function HomeScreen() {
  return (
    <LinearGradient
      colors={['#c2c8c5', '#ddddda']}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
      <FloatingAction actions={actions} color="#c2c8c5" />
    </LinearGradient>
  );
}

export default HomeScreen;
