import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes, {bool} from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
  inputView: {
    height: 45,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    color: 'black',
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {flex: 1, height: 60, borderRadius: 25},
  textValid: {
    borderColor: 'rgba(0,0,0,0.2)',
  },
  textInvalid: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 25,
  },
});
const Input = (props) => {
  const [isEmpty, setEmpty] = useState(true);
  const [inputText, setInputText] = useState('');

  return (
    <View
      style={{
        height: 60,
        marginBottom: 5,
      }}>
      <View
        style={{
          ...styles.inputView,
          height: 45,
          borderColor: props.isError ? 'red' : 'rgba(0,0,0,0.2)',
        }}>
        <TextInput
          ref={(input) => {
            this.textInput = input;
          }}
          style={[styles.textInput, (placeholderTextColor = 'black')]}
          placeholderTextColor="black"
          placeholder={props.placeholder}
          value={inputText}
          onChangeText={(text) => {
            setInputText(text);
            if (props.onChange) {
              props.onChange(text);
            }
          }}
          secureTextEntry={props.isSecure}
          autoCapitalize="none"
        />
        {!('' == inputText) && (
          <TouchableOpacity
            style={{}}
            onPress={() => {
              setInputText('');
            }}>
            <Icon
              name="closecircleo"
              size={20}
              style={{marginHorizontal: 10}}
            />
          </TouchableOpacity>
        )}
      </View>
      {props.isError && (
        <Text style={{color: 'red', fontSize: 10, marginLeft: 20}}>
          {props.errorText}
        </Text>
      )}
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
