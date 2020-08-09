import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

export default function Button(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress} disabled={props.disabled}>
      <View
        style={{
          ...styles.button,
          ...props.extraStyling,
        }}>
        <Text
          style={{...props.extraTextStyling, fontSize: 20, fontWeight: 'bold'}}>
          {props.text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    height: 70,
    borderRadius: 35,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    elevation: 5,
    shadowOpacity: 0.2,
    position: 'absolute',
    // bottom: 10,
    width: '80%',
  },
});
