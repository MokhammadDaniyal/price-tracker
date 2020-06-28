import React from 'react';
import {View, Text} from 'react-native';
import {Button} from '@ant-design/react-native';
import {connect} from 'react-redux';

import {loginUser} from '../store/userReducer/actions';

const LoginScreen = (props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        style={{marginBottom: 10, width: 150}}
        size="large"
        type="primary"
        onPress={() => props.navigation.navigate('Auth')}>
        Login
      </Button>
      <Text style={{fontSize: 18}}>or</Text>
      <Button
        style={{marginTop: 10, width: 150}}
        size="large"
        type="primary"
        onPress={() => props.navigation.navigate('Signup')}>
        Sign up
      </Button>
    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
