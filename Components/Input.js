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
    height: 50,
    borderRadius: 25,
    borderWidth: 0.4,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    color: 'black',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {flex: 1, height: 50},
  textValid: {
    borderColor: 'rgba(0,0,0,0.2)',
  },
  textInvalid: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
const Input = (props) => {
  const [isEmpty, setEmpty] = useState(true);
  const [inputText, setInputText] = useState('');

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}>
      <View style={styles.inputView}>
        <TextInput
          ref={(input) => {
            this.textInput = input;
          }}
          style={[
            styles.textInput,
            (placeholderTextColor = 'black'),
            props.isError ? styles.textInvalid : styles.textValid,
          ]}
          placeholderTextColor="black"
          placeholder={props.placeholder}
          value={inputText}
          onChangeText={(text) => {
            setInputText(text);
            if (props.onChang) props.onChange(text);
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
