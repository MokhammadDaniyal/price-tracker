/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import RootNavigator from './navigation';
import {AppLoading} from 'expo';
import SplashScreen from 'react-native-splash-screen';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };

    //   let imagePromise = Image.prefetch('assets/bg.jpg');
    //   Promise.all([imagePromise]).then(() => {
    //     console.log('LOADED!!');
    //   });
  }
  render() {
    // const img = require('./assets/bg.jpg');
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    return (
      <RootNavigator
        hasToken={this.props.hasToken}
        loading={this.state.isLoading}
      />
    );
  }
}

mapStateToProps = (state) => {
  return {
    hasToken: state.user.hasToken,
  };
};

mapDispatchToProps = (props) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
