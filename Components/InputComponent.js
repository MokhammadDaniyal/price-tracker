import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    height: 40,
    backgroundColor: 'white',
    width: 350,
    paddingLeft: 10,
    borderRadius: 5,
  },
  textValid: {
    borderColor: 'gray',
  },
  textInvalid: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
const InputComponent = (props) => {
  console.log(props.isError);
  return (
    <View style={{margin: 15}}>
      <TextInput
        style={[
          styles.text,
          props.isError ? styles.textInvalid : styles.textValid,
        ]}
        placeholder={props.placeholder}
        onChangeText={(text) => props.onChange(text)}
        secureTextEntry={props.isSecure}
        autoCapitalize="none"
      />
      {props.isError && <Text style={{color: 'red'}}>{props.errorText}</Text>}
    </View>
  );
};

InputComponent.propTypes = {
  isError: PropTypes.bool,
  isSecure: PropTypes.bool,
  errorText: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputComponent;
