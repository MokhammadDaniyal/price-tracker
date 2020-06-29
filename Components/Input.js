import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  text: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    color: 'black',
  },
  textValid: {
    borderColor: 'rgba(0,0,0,0.2)',
  },
  textInvalid: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
const Input = (props) => {
  return (
    <View>
      <TextInput
        style={[
          styles.text,
          (placeholderTextColor = 'black'),
          props.isError ? styles.textInvalid : styles.textValid,
        ]}
        placeholderTextColor="black"
        placeholder={props.placeholder}
        onChangeText={props.onChange}
        secureTextEntry={props.isSecure}
        autoCapitalize="none"
      />
      {props.isError && <Text style={{color: 'red'}}>{props.errorText}</Text>}
    </View>
  );
};

Input.propTypes = {
  isError: PropTypes.bool,
  isSecure: PropTypes.bool,
  errorText: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
