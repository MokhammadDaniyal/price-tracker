import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dimensions} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;

function HomeScreen(props) {
  return (
    <LinearGradient
      colors={['#c2c8c5', '#ddddda']}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
      <FloatingAction
        animated={false}
        showBackground={false}
        color="#c2c8c5"
        onPressMain={(name) => {
          props.navigation.navigate('ProductSearch');
        }}
      />
    </LinearGradient>
  );
}

export default HomeScreen;
