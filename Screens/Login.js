import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {connect} from 'react-redux';

import {loginUser} from '../store/userReducer/actions';

class LoginScreen extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>LOGIN!</Text>
        <Button title="LOGIN" onPress={this.props.login} />
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    hasToken: state.user.hasToken,
  };
};

mapDispatchToProps = dispatch => {
  return {
    login: () => {
      dispatch(loginUser());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
