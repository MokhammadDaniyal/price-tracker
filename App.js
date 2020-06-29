/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {connect} from 'react-redux';
import RootNavigator from './navigation';
import {Asset} from 'expo-asset';
import {AppLoading} from 'expo';

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require('./assets/bg.jpg')]);

    await Promise.all([...imageAssets]);
  }
  render() {
    if (this.state.isLoading) {
      <AppLoading
        startAsync={this._loadAssetsAsync}
        onFinish={() => this.setState({isLoading: true})}
        onError={console.warn}
      />;
    }
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
