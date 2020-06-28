import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {Button} from '@ant-design/react-native';
import InputComponent from '../Components/InputComponent';
import {connect} from 'react-redux';

import {loginUser} from '../store/userReducer/actions';

const SignupScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{flex: 1, justifyContent: 'center'}}
      behavior="padding">
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>
          Please provide your email and password:
        </Text>
        <InputComponent
          placeholder="Email"
          isError={emailError}
          onChange={setEmail}
        />
        <InputComponent
          isSecure={true}
          placeholder="Password"
          onChange={(text) => setPassword(text)}
        />
        <InputComponent
          isSecure={true}
          isError={password !== confirmPassword}
          placeholder="Confirm password"
          onChange={(text) => setConfirmPassword(text)}
          errorText="Passwords don't match"
        />
        <Button
          style={{marginTop: 10, width: 150}}
          size="large"
          type="primary"
          onPress={() => {
            if (email == '') {
              setEmailError(email == '');
            } else props.login();
          }}>
          Sing up
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

mapStateToProps = (state) => {
  return {
    hasToken: state.user.hasToken,
  };
};

mapDispatchToProps = (dispatch) => {
  return {
    login: () => {
      dispatch(loginUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
