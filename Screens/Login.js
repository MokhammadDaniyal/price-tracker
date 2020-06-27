import React from 'react';
import {View} from 'react-native';
import {Button} from '@ant-design/react-native';
import {connect} from 'react-redux';

import {loginUser} from '../store/userReducer/actions';

const LoginScreen = (props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button size="large" type="primary" onPress={props.login}>
        Login
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
