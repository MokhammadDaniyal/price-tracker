import React, {useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {Button} from '@ant-design/react-native';
import Input from '../Components/Input';

import {loginUser} from '../store/userReducer/actions';

const AuthScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorEmail, setErrorEmail] = useState(false);
  const [isErrorPassword, setErrorPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{flex: 1, justifyContent: 'center'}}
      behavior="padding">
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>
          Please provide your email and password:
        </Text>
        <InputComponent
          isError={isErrorEmail}
          placeholder="Email"
          onChange={(text) => {
            setErrorEmail(false);
            setEmail(text);
          }}
        />
        <InputComponent
          isError={isErrorPassword}
          isSecure={true}
          placeholder="Password"
          onChange={(text) => {
            setErrorPassword(false);
            setPassword(text);
          }}
        />
        <Button
          style={{marginTop: 10, width: 150}}
          size="large"
          type="primary"
          onPress={() => {
            if (email == '' || password == '') {
              setErrorEmail(email == '');
              setErrorPassword(password == '');
            } else props.login();
          }}>
          Login
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
